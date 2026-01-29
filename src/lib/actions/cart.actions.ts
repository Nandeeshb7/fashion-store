"use server";

import { formatError, ZodError } from "zod";
import { CartItem } from "../../../types";
import { cookies } from "next/headers";
import { auth } from "../../../auth";
import { prisma } from "../../../db/prisma";
import { convertToPlainObject, roundTwo } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

// Calculate cart prices.

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundTwo(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = roundTwo(itemsPrice < 100 ? 0 : 10),
    taxPrice = roundTwo(0.15 * itemsPrice),
    totalPrice = roundTwo(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(
  data: CartItem,
): Promise<{ success: boolean; message: string }> {
  try {
    // check for cart cookie

    const cookieStore = cookies();
    let sessionCartId = cookieStore.get("sessionCartId")?.value;
    if (!sessionCartId) {
      sessionCartId = crypto.randomUUID();
      cookieStore.set("sessionCartId", sessionCartId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    // Check for cart cookie
    if (!sessionCartId) throw new Error("Session Cart Id not found");

    // get session  and user Id
    const session = await auth();
    const userId = session?.user?.id ? session?.user?.id : undefined;

    // Get cart
    const cart = await getMyCard();

    //parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      // create  new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      console.log(newCart, "new cart");

      // Add to database
      await prisma.cart.create({
        data: newCart,
      });
      // Revalidate cart page;
      revalidatePath(`/product/${item.productId}`);
    } else {
      // check it them is already  in cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId,
      );

      if(existItem){
        // check stock
        if(product.stock < existItem.qty + item.qty){
          throw new Error("Not enough stock");
        }

        // Increase the quanty

        (cart.items as CartItem[]).find((x)=> x.productId === item.productId)!.qty = existItem.qty + 1;

      } else {
        // if item does not exist in the cart
        // Check stock
        if(product.stock < 1) throw new Error("Not enough stock");


        //Add item to the cart.items

        cart.items.push(item);
      }


      // save to database
      await prisma.cart.update({
        where : {id: cart.id},
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[])
        }
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success:true,
        message: `${product.name} ${existItem ? 'updated in' : 'added to'} cart`,
      }
      
    }

    // // Testing..
    // console.log({
    //   "sessinCart;": sessionCartId,
    //   userId: userId,
    //   "item Requested": item,
    //   "product Found": product,
    // });

    return {
      success: true,
      message: `${product.name} added to cart`,
    };
  } catch (error) {
    const message =
      error instanceof ZodError
        ? JSON.stringify(formatError(error))
        : error instanceof Error
          ? error.message
          : "Unknown error";
    return {
      success: false,
      message,
    };
  }
}

export async function getMyCard() {
  const cookieStore = cookies();
  let sessionCartId = cookieStore.get("sessionCartId")?.value;
  if (!sessionCartId) {
    sessionCartId = crypto.randomUUID();
    cookieStore.set("sessionCartId", sessionCartId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // Check for cart cookie
  if (!sessionCartId) throw new Error("Session Cart Id not found");

  // get session  and user Id
  const session = await auth();
  const userId = session?.user?.id ? session?.user?.id : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // convert decimals and return

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

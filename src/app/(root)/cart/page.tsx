import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "../../../../types";
import CartTable from "./cart-table";


export const metadata = {
    title: "Shopping Cart",
};

const CartPage = async () => {
    let cart;
    try {
        cart = await getMyCart();
    } catch (error) {
        console.error("Error fetching cart:", error);
        cart = undefined;
    }
    return (
        <>
            <CartTable cart={cart}/>
        </>
    )
}

export default CartPage;    
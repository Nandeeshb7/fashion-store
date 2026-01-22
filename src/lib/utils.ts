import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JavaScript object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// format number with decimal places

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

//format errors
export function formatErrors(error: any): string {
  if (!error) return "Unknown error";

  if (error.name === "ZodError") {
    const issues = Array.isArray(error.issues) ? error.issues : [];
    if (issues.length > 0) {
      return issues.map((i: any) => i?.message).filter(Boolean).join(". ");
    }

    const errs = Array.isArray(error.errors) ? error.errors : [];
    if (errs.length > 0) {
      return errs.map((e: any) => e?.message).filter(Boolean).join(". ");
    }

    return "Invalid input";
  }

  if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    const target = Array.isArray(error.meta?.target)
      ? error.meta.target.join(",")
      : error.meta?.target;
    return `Already exists: ${target || "unique field"}`;
  }

  return typeof error.message === "string" && error.message.length > 0
    ? error.message
    : "Something went wrong";
}

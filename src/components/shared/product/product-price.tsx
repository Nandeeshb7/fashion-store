import { cn } from "@/lib/utils"; // dynamic class names

const ProductPrice = ({value,className}:{value:number; className ?:string})=>{
    // ensure two decimal places;
    const stringValue = value.toFixed(2);
    console.log("Price value:", stringValue);

// get Int/float
console.log("Integer part:", stringValue.split("."));
const [integerPart, decimalPart] = stringValue.split(".");



return(
   <p className={cn("text-2xl",className)}>
    <span className="text-xs align-supper">$</span>
    {integerPart}
    <span className="text-xs align-supper">.{decimalPart}</span>

   </p>
)
} 
export default ProductPrice;
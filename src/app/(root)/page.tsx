import ProductList from "@/components/shared/product/product-list";
import sampleData from "../../../db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";


const delay = (ms:any) => new Promise((resolve) =>setTimeout(resolve,ms))
console.log(sampleData)

 const HomePage = async () => {

  const latestProducts = await getLatestProducts();
  await delay(2000)


  return (
    <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
  )
}
export default HomePage;

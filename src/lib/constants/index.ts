export const APP_Name = process.env.NEXT_PUBLIC_APP_NAME || `Fashion Store - Modern Clothing & Accessories`
export const APP_Description =  process.env.NEXT_PUBLIC_APP_DESCRIPTION || `Discover the latest trends in fashion with our curated collection of clothing and accessories.`
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || `http://localhost:3000`;

export const LATEST_PRODUCTS_LIMIT = Number(process.env.LASTEST_PRODUCTS_LIMIT) || 4;



export const signInDefaultValues = {
    email: '',
    password: ''
}
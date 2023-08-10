import { createContext, useState,useEffect } from "react";
import { addCollectionAndDocuments,getCollectionAndDocuments } from "../utils/firebase.utlis";

export const ProductContext = createContext({
    productValue : [],
})

const ProductProvider = ({children})=>{
    const [products,setProducts] = useState([]);
    const value = {products};

    useEffect(()=>{
        const categoryMap = async() =>{
            let data = await getCollectionAndDocuments()
            console.log(data);
        }

        categoryMap()
    },[])

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export default ProductProvider
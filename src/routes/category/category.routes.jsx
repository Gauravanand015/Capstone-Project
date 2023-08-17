import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../context/product.context";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/products/product.component";
import './category.styles.scss'
const Category = () => {
  const category = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products,setProducts] = useState(categoriesMap[category.category]);

    useEffect(()=>{
        setProducts(categoriesMap[category.category])
    },[category,categoriesMap])

    console.log(products)

    return(
        <Fragment>
            <h2 className='category-title'>{category.category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
        </Fragment>
    )

};

export default Category;

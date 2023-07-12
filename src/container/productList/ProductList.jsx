import React from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../components'
import { useHomeContext } from '../../context/home_context'
import { useProductsContext } from '../../context/products_context'

import './ProductList.css'
// import { ProductCard } from '../../components'

const DATA = [
    { id: 1, name: 'abc', image: 'https://applified.co.in/medex/storage/uploads/product/20211201100452648400Aaxvc.jpg', price: 200 },
]
const ProductLIst = () => {
    const { products } = useProductsContext()
    // console.log("hello ->", products);

    const { categories } = useHomeContext()


    return (
        <div className='product_list_main_wrapper'>
            <div className="product_list_base_wrap">
                <div className="filter_container">
                    <div className="category_wrap">
                        <label>CATEGORY</label>
                        {categories && categories.length > 0 ?
                            categories.map((c, index) => {
                                return (
                                    <Link className='category_link' to={{ pathname: "/ProductPage", state: c.id }} >{c.name}</Link>
                                )
                            }) : null}
                    </div>
                </div>
                <div className="list_container">
                    {products && products.length ?
                        products.map((item) => {
                            return (
                                <div className='list_card_wrap'>
                                    <ProductCard product={item} />
                                </div>
                            )
                        }) : null}
                </div>
            </div>
        </div>
    )
}

export default ProductLIst
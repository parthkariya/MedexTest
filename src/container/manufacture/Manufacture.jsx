import React from 'react'
import { ProductCard } from '../../components'
import { useProductsContext } from '../../context/products_context'
import "./Manufacture.css"

const Manufacture = (props) => {

    const { menufacture_product
    } = useProductsContext()
    // console.log("jalpesh -->menufacture_product", menufacture_product);
    return (
        <div className="manufa_main_wrapper">
            <div className="manufa_base_wrapper">
                <div className="manufa_headind_wrap">
                    <div className="manufa_name_wrap">
                        <h2 className="manufa_name">{props.manu_name}</h2>
                    </div>
                </div>
                <div className="manufa_body_wrap">
                    <div className="manufa_product_wrap">
                        {menufacture_product && menufacture_product.length ?
                            menufacture_product.map((item) => {
                                return (
                                    <div className='list_card_wrap'>
                                        <ProductCard product={item} />
                                    </div>
                                )
                            }) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manufacture
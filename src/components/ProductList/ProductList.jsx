import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {id:'1', title: 'Джинсы', prise: 5000, description: 'Синего цвета, прямые'},
    {id:'2', title: 'Куртка', prise: 12000, description: 'Красного цвета, зимняя'},
    {id:'3', title: 'Футболка', prise: 1000, description: 'Черного цвета'},
    {id:'4', title: 'Свитер', prise: 3000, description: 'Желтого цвета, теплый'},
    {id:'5', title: 'Кепка', prise: 500, description: 'Цвета хакки'},
    {id:'6', title: 'Сапоги', prise: 15000, description: 'Белого цвета, женские'},
    {id:'7', title: 'Панамка', prise: 200, description: 'Синего цвета, летняя'},
    {id:'8', title: 'Джемпер', prise: 5000, description: 'Синего цвета'},
]

const getTotalPrise = (items) => {
    return item.reduce((acc, item) => {
        return acc += item.prise
    }, 0)
}

const ProductList = () => {
    
    const [addedItems, setAddedItems] = useState([])

    const {tg} = useTelegram()

    const onAdd = (product) => {

        const alreadyAdded = addedItems.find(item => item.id === product.id)
        let newItems = []

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить: ${getTotalPrise(newItems)}`
            })
        }
    }

    return (
        <div className={"list"}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    )
}

export default ProductList
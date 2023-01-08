import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {id:'1', title: 'Перфоратор', prise: 5000, description: 'Пульсар'},
    {id:'2', title: 'Шуруповерт', prise: 3000, description: 'Crown'},
    {id:'3', title: 'УШМ', prise: 6000, description: 'Bosch'},
    {id:'4', title: 'Сабельная пила', prise: 4200, description: 'Crown'},
    {id:'5', title: 'Бензопила', prise: 7300, description: 'DDE'},
    {id:'6', title: 'Мотоблок', prise: 25000, description: 'Brite'},
    {id:'7', title: 'Триммер', prise: 7800, description: 'Champion'},
    {id:'8', title: 'Мотокоса', prise: 9600, description: 'DDE'},
]

const getTotalPrise = (item) => {
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
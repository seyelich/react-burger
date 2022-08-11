import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';

export default function BurgerIngredient({item, updateItem}) {

    const handleChoose = () => {
        if(item.type === 'bun') {
            updateItem({
                ...item,
                count: 1
            })
        }
        else {
            updateItem({
                ...item,
                count: item.count + 1
            })
        }
    }



    return (
        <li className={ingredientStyles.ingredient} onClick={handleChoose}>
            { item.count !==0 && <Counter count={item.count} size="default" /> }
            <img src={item.image}/>
            <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
        </li>
    )
}
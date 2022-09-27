import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { itemPropTypes } from '../utils/types';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

export default function BurgerIngredient({item, handleClick}) {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item
    })

    return (
        <li className={ingredientStyles.ingredient} onClick={handleClick} ref={dragRef} >
            { item.qty !== 0 && <Counter count={item.qty} size="default" /> }
            <img src={item.image} alt={item.title} />
            <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
        </li>
    )
}

BurgerIngredient.propTypes = {
    item: itemPropTypes.isRequired,
    handleClick: PropTypes.func.isRequired
}
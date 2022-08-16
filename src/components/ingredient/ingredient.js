import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { itemPropTypes } from '../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function BurgerIngredient({item, handleOpenModal, handleCloseModal, visibility}) {
    const modal = (
        <IngredientDetails item={item} handleClose={handleCloseModal} title='Детали ингредиента' />
    )

    return (
        <li className={ingredientStyles.ingredient} onClick={handleOpenModal}>
            { item.count !== undefined && <Counter count={item.count} size="default" /> }
            <img src={item.image} alt={item.title} />
            <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
            {visibility && modal}
        </li>
    )
}

BurgerIngredient.propTypes = {
    item: itemPropTypes.isRequired
}
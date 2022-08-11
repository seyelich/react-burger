import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import PropTypes from 'prop-types';

export default function BurgerIngredient({item}) {
    return (
        <li className={ingredientStyles.ingredient}>
            { item.count !== undefined && <Counter count={item.count} size="default" /> }
            <img src={item.image}/>
            <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
        </li>
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		calories: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		__v: PropTypes.number,
	}).isRequired
}
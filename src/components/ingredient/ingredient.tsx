import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { TIngr } from '../../types';

export const BurgerIngredient: FC<{item: TIngr}> = ({item}) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item
    });

    const location = useLocation();

    return (
        <li ref={dragRef} >
            <Link to={{pathname: `/ingredients/${item._id}`, state: { bg: location }}} className={`${ingredientStyles.ingredient} text text_type_main-default text_color_primary`}>
                { item.qty !== 0 && <Counter count={item.qty} size="default" /> }
                <img src={item.image} alt={item.name} />
                <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                    <p className="text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
            </Link>
        </li>
    )
}

import { CurrencyIcon, Counter, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { itemPropTypes } from '../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ChosenItemsContext, DataContext } from '../../services/appContext';
import { useContext } from 'react';

export default function BurgerIngredient({item, handleOpenModal, handleCloseModal, visibility}) {
    const { state, setState } = useContext(DataContext);
    const { chosenItems, setChosenItems } = useContext(ChosenItemsContext);

    const modal = (
        <IngredientDetails item={item} handleClose={handleCloseModal} title='Детали ингредиента' />
    )

   const handleClick = () => {
        handleOpenModal();
        setState( 
            {
                ...state, data: state.data.map((el) => {
                    if(el._id === item._id) {
                        return el.type !== 'bun' ? {...el, qty: ++el.qty} : {...el, qty: 1}
                    }
                    else {
                        return el.type !== 'bun' ? el : item.type === 'bun' ? {...el, qty: 0} : el
                    }
                })
            }
        )

        setChosenItems(item.type !== 'bun' ? 
            [...chosenItems, item] //repeat
            : () => {
                const index = [...chosenItems].findIndex((el) => el.type === 'bun');
                const newState = [...chosenItems];
            
                if(index !== -1) {
                    newState[index] = item
                    return newState
                }
                else {
                    return [...chosenItems, item]
                }
            }
        )
    }

    return (
        <>
            <li className={ingredientStyles.ingredient} onClick={handleClick}>
                { item.qty !== 0 && <Counter count={item.qty} size="default" /> }
                <img src={item.image} alt={item.title} />
                <div className={`${ingredientStyles.priceContainer} mb-2 mt-2`}>
                    <p className="text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</p>
            </li>
            {visibility && modal}
        </>
    )
}

BurgerIngredient.propTypes = {
    item: itemPropTypes.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    visibility: PropTypes.bool.isRequired
}
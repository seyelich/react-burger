import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useState } from 'react';
import ingredientsStyles from './ingredients.module.css';
import { CurrItemContext, DataContext, ChosenItemsContext } from '../../services/appContext';
import BurgerIngredient from "../ingredient/ingredient";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";;

export default function BurgerIngredients() {
    const [ current, setCurrent ] = useState('one');
    const [visibility, setVisibility] = useState(false);
    const { state, setState } = useContext(DataContext);
    const { currItem, setCurrItem } = useContext(CurrItemContext);
    const { chosenItems, setChosenItems } = useContext(ChosenItemsContext);
    const data = state.data;
    
    function handleClick(item) {
        setVisibility(true);
        setCurrItem(item);
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

    function handleCloseModal() {
        setVisibility(false)
    }

    const modal = (
        <Modal handleClose={handleCloseModal} title='Детали ингредиента' hasOverlay={true}>
            <IngredientDetails item={currItem} /> 
        </Modal>
    )
    
    function filterData(data, type) {
        return data
            .filter((item) => item.type === type)
            .map((el) => <BurgerIngredient key={el._id} item={el} handleClick={() => handleClick(el)} />)
    }

    return (
        <section className="default-section mb-10">
            <h2 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h2>
            <menu className="default-list mb-10 mt-5">
                <li>
                    <a className={ingredientsStyles.link} href="#buns">
                        <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                    </a>
                </li>

                <li>
                    <a className={ingredientsStyles.link} href="#sauces">
                        <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                    </a>
                </li>

                <li>
                    <a className={ingredientsStyles.link} href="#fillings">
                        <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
                    </a>
                </li>
            </menu>

            <ul className={`${ingredientsStyles.itemsList} default-list`}>
                <li id="buns">
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                        { filterData(data, 'bun') }
                    </ul>
                </li>

                <li id="sauces">
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                        { filterData(data, 'sauce') }
                    </ul>
                </li>

                <li id="fillings">
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                        { filterData(data, 'main') }
                    </ul>
                </li>
            </ul>
            {visibility && modal}
        </section>
    )
}

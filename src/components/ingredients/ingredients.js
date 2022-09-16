import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import ingredientsStyles from './ingredients.module.css';
import BurgerIngredient from "../ingredient/ingredient";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ITEM_INFO, DELETE_ITEM_INFO } from '../../services/actions/modals';

export default function BurgerIngredients() {
    const [ current, setCurrent ] = useState('buns');
    const [visibility, setVisibility] = useState(false);

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);
    const containerRef = useRef(null);

    const tabHandleClick = (val) => {
        setCurrent(val)
        val === 'buns' && bunsRef.current.scrollIntoView({behavior: 'smooth'});
        val === 'sauces' && saucesRef.current.scrollIntoView({behavior: 'smooth'});
        val === 'fillings' && fillingsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const dispatch = useDispatch();

    const { items, itemsRequest } = useSelector(store => store.ingredients);
    
    function handleClick(item) {
        setVisibility(true);
        dispatch({type: ADD_ITEM_INFO, payload: item});
    }

    function handleCloseModal() {
        setVisibility(false);
        dispatch({type: DELETE_ITEM_INFO});
    }

    function handleScroll() {
        const bunsDistance = Math.abs(bunsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
        const saucesDistance = Math.abs(saucesRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
        const fillingsDistance = Math.abs(fillingsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
        
        if(bunsDistance<saucesDistance) {
            setCurrent('buns')
        }
        else if(saucesDistance<fillingsDistance) {
            setCurrent('sauces')
        }
        else if(fillingsDistance<bunsDistance) {
            setCurrent('fillings')
        }
    }

    const modal = (
        <Modal handleClose={handleCloseModal} title='Детали ингредиента' hasOverlay={true}>
            <IngredientDetails /> 
        </Modal>
    )
    
    function filterData(data, type) {
        return data
            .filter((item) => item.type === type)
            .map((el) => <BurgerIngredient key={el._id} item={el} handleClick={() => handleClick(el)} />)
    }

    return (
        <section className="default-section mb-10" ref={containerRef}>
            <h2 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h2>
            <menu className="default-list mb-10 mt-5">
                <li>
                    <Tab value="buns" active={current === 'buns'} onClick={tabHandleClick} className={ingredientsStyles.link}>Булки</Tab>
                </li>

                <li>
                    <Tab value="sauces" active={current === 'sauces'} onClick={tabHandleClick} className={ingredientsStyles.link}>Соусы</Tab>

                </li>

                <li>
                    <Tab value="fillings" active={current === 'fillings'} onClick={tabHandleClick} className={ingredientsStyles.link}>Начинки</Tab>
                </li>
            </menu>

            <ul className={`${ingredientsStyles.itemsList} default-list`} onScroll={handleScroll}>
                <li ref={bunsRef}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    {
                        itemsRequest ? <p className={`${ingredientsStyles.loading} text text_type_main-large`}>...</p> 
                        : <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'bun') }
                        </ul>
                    }
                </li>

                <li ref={saucesRef}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    {
                        itemsRequest ? <p className={`${ingredientsStyles.loading} text text_type_main-large`}>...</p> :
                        <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'sauce') }
                        </ul>
                    }
                </li>

                <li ref={fillingsRef}>
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    {
                        itemsRequest ? <p className={`${ingredientsStyles.loading} text text_type_main-large`}>...</p> :
                        <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'main') }
                        </ul>
                    }
                </li>
            </ul>
            {visibility && modal}
        </section>
    )
}

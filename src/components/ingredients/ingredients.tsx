import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import ingredientsStyles from './ingredients.module.css';
import { BurgerIngredient } from "../ingredient/ingredient";
import { useSelector } from '../../services/hooks';
import { TIngr } from '../../types';
import { Tabs } from '../../utils/constants';

export default function BurgerIngredients() {
    const [ current, setCurrent ] = useState(Tabs.BUNS);
    const { items, itemsRequest } = useSelector(store => store.ingredients);

    const bunsRef = useRef<HTMLLIElement>(null);
    const saucesRef = useRef<HTMLLIElement>(null);
    const fillingsRef = useRef<HTMLLIElement>(null);
    const containerRef = useRef<HTMLLIElement>(null);

    const tabHandleClick = (val: string) => {
        setCurrent(val)
        if (bunsRef.current && saucesRef.current && fillingsRef.current) {
            val === Tabs.BUNS && bunsRef.current.scrollIntoView({behavior: 'smooth'});
            val === Tabs.SAUCES && saucesRef.current.scrollIntoView({behavior: 'smooth'});
            val === Tabs.FILLINGS && fillingsRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    function handleScroll() {
        if (bunsRef.current && saucesRef.current && fillingsRef.current && containerRef.current) {
            const bunsDistance = Math.abs(bunsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
            const saucesDistance = Math.abs(saucesRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
            const fillingsDistance = Math.abs(fillingsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
            
            if(bunsDistance<saucesDistance) {
                setCurrent(Tabs.BUNS)
            }
            else if(saucesDistance<fillingsDistance) {
                setCurrent(Tabs.SAUCES)
            }
            else if(fillingsDistance<bunsDistance) {
                setCurrent(Tabs.FILLINGS)
            }
        }
    }
    
    function filterData(data: ReadonlyArray<TIngr>, type: string) {
        return data
            .filter((item) => item.type === type)
            .map((el) => <BurgerIngredient key={el._id} item={el} />)
    }

    return (
        <section className="default-section mb-10" ref={containerRef}>
            <h2 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h2>
            <menu className="default-list mb-10 mt-5">
                <li >
                    <Tab value={Tabs.BUNS} active={current === Tabs.BUNS} onClick={tabHandleClick}>Булки</Tab>
                </li>

                <li>
                    <Tab value={Tabs.SAUCES} active={current === Tabs.SAUCES} onClick={tabHandleClick}>Соусы</Tab>

                </li>

                <li>
                    <Tab value={Tabs.FILLINGS} active={current === Tabs.FILLINGS} onClick={tabHandleClick}>Начинки</Tab>
                </li>
            </menu>

            <ul className={`${ingredientsStyles.itemsList} default-list`} onScroll={handleScroll}>
                <li ref={bunsRef}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    {
                        itemsRequest ? <p className="loading text text_type_main-large">...</p> 
                        : <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'bun') }
                        </ul>
                    }
                </li>

                <li ref={saucesRef}>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    {
                        itemsRequest ? <p className="loading text text_type_main-large">...</p> :
                        <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'sauce') }
                        </ul>
                    }
                </li>

                <li ref={fillingsRef}>
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    {
                        itemsRequest ? <p className="loading text text_type_main-large">...</p> :
                        <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                            { filterData(items, 'main') }
                        </ul>
                    }
                </li>
            </ul>
        </section>
    )
}

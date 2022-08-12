import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ingredientsStyles from './ingredients.module.css';
import { dataPropTypes } from '../utils/types';
import filterData from '../utils/utils';


export default function BurgerIngredients({ data }) {
    const [current, setCurrent] = React.useState('one');

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
                        { filterData('bun') }
                    </ul>
                </li>

                <li id="sauces">
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                        { filterData('sauce') }
                    </ul>
                </li>

                <li id="fillings">
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                        { filterData('main') }
                    </ul>
                </li>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: dataPropTypes.isRequired
}
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredient from '../ingredient/ingredient'
import ingredientsStyles from './ingredients.module.css';


export default function BurgerIngredients({ data, updateItem }) {
    const [current, setCurrent] = React.useState('one');

    return (
        <section className={`${ingredientsStyles.section} mb-10`}>
            <h2 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h2>
            <menu className={`${ingredientsStyles.list} mb-10 mt-5`}>
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

            <ul className={ingredientsStyles.itemsList}>
                <li id="buns">
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6`}>
                        {data
                            .filter((item) => item.type === 'bun')
                            .map((el) => <BurgerIngredient key={el._id} item={el} updateItem={updateItem} />)
                        }
                    </ul>
                </li>

                <li id="sauces">
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6`}>
                    {data
                            .filter((item) => item.type === 'sauce')
                            .map((el) => <BurgerIngredient key={el._id} item={el} updateItem={updateItem} />)
                        }
                    </ul>
                </li>

                <li id="fillings">
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6`}>
                    {data
                            .filter((item) => item.type === 'main')
                            .map((el) => <BurgerIngredient key={el._id} item={el} updateItem={updateItem} />)
                        }
                    </ul>
                </li>
            </ul>
        </section>
    )
}


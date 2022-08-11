import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredient from '../ingredient/ingredient'
import ingredientsStyles from './ingredients.module.css';
import PropTypes from 'prop-types';


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
                        {data
                            .filter((item) => item.type === 'bun')
                            .map((el) => <BurgerIngredient key={el._id} item={el} />)
                        }
                    </ul>
                </li>

                <li id="sauces">
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                    {data
                            .filter((item) => item.type === 'sauce')
                            .map((el) => <BurgerIngredient key={el._id} item={el} />)
                        }
                    </ul>
                </li>

                <li id="fillings">
                    <h3 className="text text_type_main-medium">Начинка</h3>
                    <ul className={`${ingredientsStyles.ingredientsList} mr-2 ml-4 mt-6 default-list`}>
                    {data
                            .filter((item) => item.type === 'main')
                            .map((el) => <BurgerIngredient key={el._id} item={el} />)
                        }
                    </ul>
                </li>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
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
	})).isRequired
}
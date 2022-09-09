import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import withModal from '../hocs/withModal';
import { dataPropTypes } from '../utils/types';
import { TotalPriceContext } from '../../services/appContext';
import { useState } from 'react';

export default function Main() {
    const WithModalBurgerContructor = withModal(BurgerConsrtuctor);
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <main className={mainStyles.content}>
            <BurgerIngredients />
            <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
                <WithModalBurgerContructor />
            </TotalPriceContext.Provider>
        </main>
    )
}

import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import { TotalPriceContext, CurrItemContext } from '../../services/appContext';
import { useState } from 'react';

export default function Main() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [ currItem, setCurrItem ] = useState({});

    return (
        <main className={mainStyles.content}>
            <CurrItemContext.Provider value={{currItem, setCurrItem}}>
                <BurgerIngredients />
            </CurrItemContext.Provider>
            <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
                <BurgerConsrtuctor />
            </TotalPriceContext.Provider>
        </main>
    )
}

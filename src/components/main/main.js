import React  from "react";
import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import { data } from '../utils/data'

export default function Main() {
    const [state, setState] = React.useState(data.map((i) => {
        i.count = 0;
        return i;
    }));
    
    const updateItem = (item) => {
        const currentItem = state.findIndex(
            (i) => i._id === item._id
        );
        const newData = [...state];
        newData[currentItem] = item;
        setState(newData);
    }

    const chosenItems = state.filter((i) => i.count !== 0)
    chosenItems.forEach((i, index, arr) => {
        if(i.type === "bun") {
            arr.push(i)
            arr[0] = i;
        }
    })

    return (
        <main className={mainStyles.content}>
            <BurgerIngredients data={state} updateItem={updateItem} />
            <BurgerConsrtuctor data={chosenItems}/>
        </main>
    )
}
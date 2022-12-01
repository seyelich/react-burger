import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import { BurgerConsrtuctor } from "../constuctor/contructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from '../../services/hooks';
import { GET_CHOSEN_ITEMS } from '../../services/constants/constructor';
import { INCREASE_ITEM } from '../../services/constants/ingrs';
import { v4 } from 'uuid';
import { TIngr } from '../../types';

export default function Main() {
    const dispatch = useDispatch();

    const handleDrop = (item: TIngr) => {
        dispatch({type: INCREASE_ITEM, payload: item});
        dispatch({type: GET_CHOSEN_ITEMS, payload: item, key: v4()});
    }

    return (
        <main className={mainStyles.content}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConsrtuctor onDropHandler={handleDrop}/>
            </DndProvider>
        </main>
    )
}

import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import { GET_CHOSEN_ITEMS } from '../../services/actions/constructor';
import { INCREASE_ITEM } from '../../services/actions/ingredients';

export default function Main() {
    const dispatch = useDispatch();

    const handleDrop = (item) => {
        dispatch({type: GET_CHOSEN_ITEMS, payload: item});
        dispatch({type: INCREASE_ITEM, payload: item});
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

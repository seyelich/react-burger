import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import { data } from '../utils/data'

export default function Main() {
    return (
        <main className={mainStyles.content}>
            <BurgerIngredients data={data} />
            <BurgerConsrtuctor data={data} />
        </main>
    )
}
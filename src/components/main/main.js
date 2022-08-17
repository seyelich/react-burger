import BurgerIngredients from '../ingredients/ingredients';
import mainStyles from './main.module.css';
import BurgerConsrtuctor from "../constuctor/contructor";
import withModal from '../hocs/withModal';
import { dataPropTypes } from '../utils/types';

export default function Main({ data }) {
    const WithModalBurgerContructor = withModal(BurgerConsrtuctor);

    return (
        <main className={mainStyles.content}>
            <BurgerIngredients data={data} />
            <WithModalBurgerContructor data={data} />
        </main>
    )
}

Main.propTypes = {
    data: dataPropTypes.isRequired
}
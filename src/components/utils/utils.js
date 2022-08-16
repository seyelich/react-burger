import withModal from "../hocs/withModal";
import BurgerIngredient from "../ingredient/ingredient";

export const WithModalBurgerIngredient = withModal(BurgerIngredient);

export default function filterData(data, type) {
    return data
        .filter((item) => item.type === type)
        .map((el) => <WithModalBurgerIngredient key={el._id} item={el} />)
}

export const adress = 'https://norma.nomoreparties.space/api/ingredients';
export const modalRoot = document.getElementById("react-modals");
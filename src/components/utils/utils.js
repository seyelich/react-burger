import BurgerIngredient from "../ingredient/ingredient"
import { data } from "./data"

export default function filterData(type) {
    return data
        .filter((item) => item.type === type)
        .map((el) => <BurgerIngredient key={el._id} item={el} />)
}
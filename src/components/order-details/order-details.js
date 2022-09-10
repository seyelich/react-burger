import img from "../../images/done.png";
import styles from './order-details.module.css';
import { ChosenItemsContext } from "../../services/appContext";
import { useContext, useEffect, useState } from "react";
import { getOrderNumber } from "../utils/burger-api";

export default function OrderDetails() {
    const [number, setNumber] = useState(null);
    const { chosenItems } = useContext(ChosenItemsContext)
    const data = chosenItems.map((el) => el._id);

    useEffect(() => {
        getOrderNumber(data, setNumber)
    }, [])

    return (
        <>
            <p className={`${styles.number} text text_type_digits-large mt-30`}>{number}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={img} alt="Заказ принят" className="mb-15 mt-15" />
            <p className="text text text_type_main-default mt-2">Ваш заказ начали готовить</p>
            <p className="text text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

import img from "../../images/done.png";
import styles from './order-details.module.css';
import { useEffect } from "react";
import { getOrder } from "../../services/actions/modals";
import { useDispatch, useSelector } from "react-redux";

export default function OrderDetails() {
    const chosenItems = useSelector(store => store.burderConstructor.chosenItems)
    const ids = chosenItems.map((el) => el._id);
    const number = useSelector(store => store.order.order.number);

    const dispatch = useDispatch();

    useEffect(() => { dispatch(getOrder(ids)) }, [dispatch])

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

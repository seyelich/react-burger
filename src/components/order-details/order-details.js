import Modal from "../modal/modal";
import img from "../../images/done.png";
import styles from './order-details.module.css'

export default function OrderDetails({data, handleClose}) {
    return (
        <Modal handleClose={handleClose}>
            <p className={`${styles.number} text text_type_digits-large mt-30`}>034536</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={img} className="mb-15 mt-15" />
            <p className="text text text_type_main-default mt-2">Ваш заказ начали готовить</p>
            <p className="text text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )
}
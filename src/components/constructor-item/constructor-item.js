import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-item.module.css';
import { itemPropTypes } from "../utils/types";

export default function ConstructorItem({item}) {
    return (
        <li className={styles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
}

ConstructorItem.propTypes = {
    item: itemPropTypes.isRequired
}
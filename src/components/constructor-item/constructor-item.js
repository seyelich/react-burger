import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-item.module.css'

export default function ConstructorItem({item, type, text}) {
    return (
        <li className={item.type === 'bun' ? `${styles.item} ml-8` : `${styles.item}`}>
            {item.type !== 'bun' && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={item.type === 'bun' && true}
                text={text}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
}
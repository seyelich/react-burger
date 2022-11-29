import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-item.module.css';
import { useDispatch } from "../../services/hooks";
import { DECREASE_ITEM } from "../../services/constants/ingrs";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useRef, FC } from "react";
import { DELETE_ITEM } from "../../services/constants/constructor";
import { ICnstrItem, TIngr } from "../../types";

export const ConstructorItem: FC<ICnstrItem> = ({ item, index, moveItem }) => {
    const id = item._id;
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: 'constructorItem',
        item: () => {
			return { id, index };
		},
    })

    const [, drop] = useDrop<{ id: string, index: number }>({ //{ handlerId }
        accept: 'constructorItem',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(el, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = el.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

            if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveItem(dragIndex, hoverIndex);
            el.index = hoverIndex;
        },
    })

    drag(drop(ref));

    const handleClose = () => {
        dispatch({ type: DELETE_ITEM, payload: item});
        dispatch({ type: DECREASE_ITEM, payload: item})
    }

    return (
        <li className={styles.item} ref={ref}> {/*data-handler-id={handlerId} */}
            <DragIcon type="primary" />
            <ConstructorElement
                handleClose={handleClose}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
}

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-item.module.css';
import { itemPropTypes } from "../../utils/types";
import { useDispatch } from "react-redux";
import { DECREASE_ITEM } from "../../services/actions/ingredients";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from 'prop-types';
import { DELETE_ITEM } from "../../services/actions/constructor";

export default function ConstructorItem({ item, index, moveItem }) {
    const id = item._id;
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: 'constructorItem',
        item: () => {
			return { id, index };
		},
    })

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructorItem',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(el, monitor) {
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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
        <li className={styles.item} ref={ref} data-handler-id={handlerId}>
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

ConstructorItem.propTypes = {
    item: itemPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired
}
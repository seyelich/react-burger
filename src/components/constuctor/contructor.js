import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor.module.css';
import PriceContainer from "../price/price";
import ConstructorItem from "../constructor-item/constructor-item";
import OrderDetails from "../order-details/order-details";
import { countPrice } from '../utils/utils';
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { MOVE_ITEM, SET_TOTAL_PRICE } from "../../services/actions/constructor";

export default function BurgerConsrtuctor({onDropHandler}) {
    const { chosenItems, price} = useSelector(store => store.burderConstructor);
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_ITEM,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }, [dispatch])

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDropHandler(item);
        }
    })

    function handleOpenModal() {
        setVisibility(true)
    }

    function handleCloseModal() {
        setVisibility(false)
    }

    useEffect(() => {
        dispatch({type: SET_TOTAL_PRICE, payload: countPrice(chosenItems)})
    }, [chosenItems, dispatch])

    const modal = (
        <Modal handleClose={handleCloseModal} hasOverlay={true}>
            <OrderDetails />
        </Modal>
    )
    
    return (
        <section className="default-section pl-4 mt-25" ref={dropTarget}>
            {
                <>
                    {
                        chosenItems
                            .filter((el) => el.type === 'bun')
                            .map((el) => 
                                <div className={`${styles.container} mr-4 mb-4`} key={el.key}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${el.name} (верх)`}
                                        price={el.price}
                                        thumbnail={el.image}
                                        className={`${styles.item} ml-8`}
                                    />
                                </div>
                            )
                    }
                
                    <ul className={`${styles.list} default-list`}>
                        { chosenItems
                            .filter((el) => el.type !== 'bun')
                            .map((el, index) => {
                                for(let i = 0; i < el.qty; i++) {
                                    return (<ConstructorItem key={el.key} item={el} moveItem={moveItem} index={index} />)
                                }
                            })
                        }
                    </ul>

                    {
                        chosenItems
                            .filter((el) => el.type === 'bun')
                            .map((el) => 
                                <div className={`${styles.container} mr-4 mt-4`} key={el.key}>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${el.name} (низ)`}
                                        price={el.price}
                                        thumbnail={el.image}
                                        className={`${styles.item} ml-8`}
                                    />
                                </div>
                            )
                    }
                </>
            }

            <div className={`${styles.priceContainer} mt-10 mr-4`}>
                <PriceContainer total={price} />
                <Button type="primary" size="large" onClick={handleOpenModal} disabled={chosenItems.find(el => el.type === 'bun') === undefined} >Оформить заказ</Button>
            </div>
            {visibility && modal}
        </section>
    )
}

BurgerConsrtuctor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}
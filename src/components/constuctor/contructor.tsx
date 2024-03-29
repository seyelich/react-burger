import { useEffect, useState, useCallback, FC } from "react";
import PropTypes from 'prop-types';
import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor.module.css';
import { PriceContainer} from "../price/price";
import { ConstructorItem } from "../constructor-item/constructor-item";
import OrderDetails from "../order-details/order-details";
import { countPrice, getCookie } from '../../utils/utils';
import { Modal } from "../modal/modal";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { MOVE_ITEM, SET_TOTAL_PRICE } from "../../services/constants/constructor";
import { useHistory } from 'react-router-dom';
import { getOrder } from "../../services/actions/modals";
import { TIngr } from "../../types";

export const BurgerConsrtuctor: FC<{onDropHandler: (item: TIngr) => void}> = ({onDropHandler}) => {
    const { chosenItems, price} = useSelector(store => store.burderConstructor);

    const [visibility, setVisibility] = useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();

    const ids = chosenItems.map((el: TIngr) => el._id);

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: MOVE_ITEM,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }, [dispatch])

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngr) {
            onDropHandler(item);
        }
    })

    function handleOpenModal() {
        if(getCookie('accessToken')) {
            setVisibility(true);
            dispatch(getOrder(ids));
        }
        else {
            history.replace({ pathname: '/login' })
        }
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
                            .filter((el: TIngr) => el.type === 'bun')
                            .map((el: TIngr) => 
                                <div className={`${styles.container} mr-4 mb-4`} key={el.key}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${el.name} (верх)`}
                                        price={el.price}
                                        thumbnail={el.image}
                                        extraClass={`${styles.item} ml-8`}
                                    />
                                </div>
                            )
                    }
                
                    <ul className={`${styles.list} default-list`}>
                        { chosenItems
                            .filter((el: TIngr) => el.type !== 'bun')
                            .map((el: TIngr, index: number) => {
                                for(let i = 0; i < el.qty; i++) {
                                    return (<ConstructorItem key={el.key} item={el} moveItem={moveItem} index={index} />)
                                }
                            })
                        }
                    </ul>

                    {
                        chosenItems
                            .filter((el: TIngr) => el.type === 'bun')
                            .map((el: TIngr) => 
                                <div className={`${styles.container} mr-4 mt-4`} key={el.key}>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${el.name} (низ)`}
                                        price={el.price}
                                        thumbnail={el.image}
                                        extraClass={`${styles.item} ml-8`}
                                    />
                                </div>
                            )
                    }
                </>
            }

            <div className={`${styles.priceContainer} mt-10 mr-4`}>
                <PriceContainer total={price} size="m" />
                <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled={chosenItems.find((el: TIngr) => el.type === 'bun') === undefined} >Оформить заказ</Button>
            </div>
            {visibility && modal}
        </section>
    )
}

BurgerConsrtuctor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}
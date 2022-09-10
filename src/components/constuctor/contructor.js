import { useContext, useEffect, useState } from "react";
import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor.module.css';
import PriceContainer from "../price/price";
import ConstructorItem from "../constructor-item/constructor-item";
import OrderDetails from "../order-details/order-details";
import { ChosenItemsContext, TotalPriceContext } from "../../services/appContext";
import { countPrice } from '../utils/utils';
import Modal from "../modal/modal";

export default function BurgerConsrtuctor() {
    const { chosenItems } = useContext(ChosenItemsContext);
    const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
    const [visibility, setVisibility] = useState(false);
        
    function handleOpenModal() {
        setVisibility(true)
    }

    function handleCloseModal() {
        setVisibility(false)
    }

    useEffect(() => {
        setTotalPrice(countPrice(chosenItems))
    }, [chosenItems])

    const modal = (
        <Modal handleClose={handleCloseModal} hasOverlay={true}>
            <OrderDetails />
        </Modal>
    )
    
    return (
        <section className="default-section pl-4 mt-25">
            {
                <>
                    {
                        chosenItems
                            .filter((el) => el.type === 'bun')
                            .map((el, index) => 
                                <div className={`${styles.container} mr-4 mb-4`} key={index}>
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
                                    return (<ConstructorItem key={index} item={el} />)
                                }
                            })
                        }
                    </ul>

                    {
                        chosenItems
                            .filter((el) => el.type === 'bun')
                            .map((el, index) => 
                                <div className={`${styles.container} mr-4 mt-4`} key={index}>
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
                <PriceContainer total={totalPrice} />
                <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            </div>
            {visibility && modal}
        </section>
    )
}
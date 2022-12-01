import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useParams, useRouteMatch } from 'react-router-dom';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/constants/ws";
import { WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_START_AUTH } from "../../services/constants/ws-auth";
import { setItems, setOrderIngrs, setStatusText, setDate, countPriceForFeed } from "../../utils/utils";
import { PriceContainer } from "../price/price";
import styles from './order-info.module.css';
import { TIngr, TOrder } from "../../types";
import { useLocation } from '../../services/hooks'

export const OrderInfo = () => {
    const isProfile = !!useRouteMatch("/profile");
    const { ordersInfo } = useSelector(store => isProfile ? store.wsAuth : store.ws);
    const { items } = useSelector(store => store.ingredients);
    const location = useLocation();
    const bg = location.state?.bg;
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch();

    const [ currOrder, setCurrOrder ] = useState<{
        date: string;
        ingredients: Array<TIngr>;
        name: string;
        num: number;
        status: string;
    }>({
        date: '',
        ingredients: [],
        name: '',
        num: 0,
        status: ''
    });
    
    const date = currOrder.date !== '' && setDate(currOrder.date);
    const item = ordersInfo?.orders ? ordersInfo?.orders.find((el: TOrder) => el._id === id)! : {
        createdAt: '',
        ingredients: [],
        name: '',
        number: 0,
        status: ''
    };

    const total = countPriceForFeed(setOrderIngrs(item?.ingredients, items));
    const { qty } = setItems(setOrderIngrs(item?.ingredients, items));
    
    useEffect(() => {
            dispatch(isProfile ? { type: WS_CONNECTION_START_AUTH } : { type: WS_CONNECTION_START, payload: '/all' });
            return () => {
                dispatch(isProfile ? { type: WS_CONNECTION_CLOSED_AUTH } : { type: WS_CONNECTION_CLOSED });}
        },
        [dispatch, isProfile]
    );

    useEffect(() => {
        setCurrOrder({
            ...currOrder,
            date: item?.createdAt,
            name: item?.name,
            num: item?.number,
            ingredients: Array.from(new Set(setOrderIngrs(item?.ingredients, items))),
            status: setStatusText(item?.status),
        });
    }, [ordersInfo?.orders]);

    return (
        ordersInfo
            ? <div className={ bg ? styles.container : styles.container_noModal}>
                { !bg && <h1 className={`${styles.num} text text_type_digits-default`}>#{currOrder.num}</h1>}
                <h1 className="text text_type_main-medium mt-10 mb-3">{currOrder.name}</h1>
                <p className={`${currOrder.status === 'Выполнен' && styles.status_type_done} text text_type_main-default`}>
                    {currOrder.status}
                </p>
                <h2 className="text text_type_main-medium mt-15">Состав:</h2>
                <ul className={`${styles.list} mb-10 mt-6 pr-8`}>
                    {
                        currOrder.ingredients.map(el =>
                            <li className={`${styles.listItem}`} key={el._id} >
                                <div className={styles.ingrCont}>
                                    <div className="bg"></div>
                                    <div className="ingr">
                                        <img className={styles.img} src={el.image} alt={el.name} />
                                    </div>
                                </div>
                                <p className={`${styles.title} text text_type_main-default`}>{el.name}</p>
                                <p className={`${styles.price} text text_type_digits-default`}>{qty[el._id]} x {el.price} <CurrencyIcon type="primary"/></p>
                            </li>
                        )
                    }
                </ul>
                <div className={`${bg && 'mb-10'} ${styles.totalCont}`}>
                    <p className="text text_type_main-default text_color_inactive">{date}</p>
                    <PriceContainer total={total}/> 
                </div>
            </div>
            : <p className="loading text text_type_main-large">...</p>
    )
}
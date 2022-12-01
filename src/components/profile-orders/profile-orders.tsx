import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_START_AUTH } from "../../services/constants/ws-auth";
import { FeedItem } from "../feed-item/feed-item";
import styles from "./profile-orders.module.css";
import { TOrder } from "../../types";

export const ProfileOrders = () => {
    const { ordersInfo } = useSelector(store => store.wsAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_AUTH });
        return () => { 
            dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
            return
        }
    }, [dispatch]);

    return (
        <ul className={`${styles.list} pr-4 ml-15`}>
            {
                ordersInfo
                    ? ordersInfo.orders?.map((el: TOrder) => <FeedItem hasStatus={true} key={el._id} item={el} />)
                    : <p className="loading text text_type_main-large">...</p>
            }
        </ul>
    )
}
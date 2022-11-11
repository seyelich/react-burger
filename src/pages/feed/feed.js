import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FeedItem } from '../../components/feed-item/feed-item'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/ws';
import styles from './feed.module.css'

export const FeedPage = () => {
    const { ordersInfo } = useSelector(store => store.ws);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });
        return () => dispatch({ type: WS_CONNECTION_CLOSED });
    }, [dispatch]);

    const filterOrders = (arr, val) => {
        return arr
            .filter(el => el.status === val)
            .map(el => <li key={el._id} className={`${el.status === 'done' && styles.color} text text_type_digits-default`}>{el.number}</li>)
    }

    return (
        <div className={styles.main}>
            <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
            {
                ordersInfo 
                    ? <div className={styles.container}>
                            <div className='mr-15'>
                                <ul className={`${styles.list} pr-4`}>
                                    {
                                        ordersInfo.orders.map(el => <FeedItem hasStatus={false} key={el._id} item={el} />)
                                    }
                                </ul>
                            </div>
                            <div className={styles.status}>
                                <div className={styles.numsStatus}>
                                    <div>
                                        <p className='text text_type_main-medium mb-6'>Готовы:</p>
                                        <ul className={styles.numsList}>
                                            {
                                                filterOrders(ordersInfo.orders, 'done')
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <p className='text text_type_main-medium mb-6'>В работе:</p>
                                        <ul className={styles.numsList}>
                                            {
                                                filterOrders(ordersInfo.orders, 'pending')
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.done}>
                                    <p className='text text_type_main-medium'>Выполнено за все время:</p>
                                    <p className={`${styles.number} text text_type_digits-large`}>{ordersInfo.total}</p>
                                </div>
                                <div className={styles.done}>
                                    <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                                    <p className={`${styles.number} text text_type_digits-large`}>{ordersInfo.totalToday}</p>
                                </div>
                            </div>
                        </div>
                    : <p className="loading text text_type_main-large">...</p>
            }
        </div>
    )
}
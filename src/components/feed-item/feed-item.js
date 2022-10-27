import styles from './feed-item.module.css';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import PriceContainer from "../price/price";
import { setStatusText, setDate, setOrderIngrs, countPriceForFeed } from "../../utils/utils";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { orderPropTypes } from '../../utils/types';

export const FeedItem = ({item, hasStatus}) => {
    const { items } = useSelector(store => store.ingredients);
    const [ status, setStatus] = useState('');
    const isProfile = !useRouteMatch("/profile");
    const location = useLocation();

    const ingrs = Array.from(new Set(setOrderIngrs(item.ingredients, items)));
    
    const price = countPriceForFeed(setOrderIngrs(item.ingredients, items));
    const date = setDate(item.createdAt);

    const renderIngrs = () => {
        const count = ingrs.length - 6;
        let zI = 6;

        if(ingrs.length <= 6) {
            return ingrs.map((el, index) => {
                zI -= 1;
                return <li className={styles.ingrCont} key={index} style={{zIndex: zI}}>
                    <div className="bg"></div>
                    <div className="ingr">
                        <img src={el.image} alt={el.title} className={styles.img} />
                    </div>
                </li>
            })
        }
        else {
            return ingrs.slice(0, 6).map((el, index) => {
                zI -= 1;
                return <li className={styles.ingrCont} key={index} style={{zIndex: zI}}>
                    <div className="bg"></div>
                    <div className="ingr">
                        <img src={el.image} alt={el.title} className={styles.img} />
                        { index === 5 &&
                            <div className={`${styles.overlay}`}>
                                <p className=' text text_type_main-default'>+{count}</p>
                            </div> 
                        }
                    </div>
                </li>
            })
        }
    }

    useEffect(() => {
        setStatus(setStatusText(item.status))
    }, [])

    const path = isProfile ? `/feed/${item._id}` : `/profile/orders/${item._id}`;
    
    return (
        <li className={styles.container}>
            <Link to={{pathname: path, state: { bg: location, num: `#${item.number}` }}} className={`${styles.link} text_color_primary p-6`}>
                <div className={styles.cont}>
                    <p className={`text text_type_digits-default`}>#{item.number}</p>
                    <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{date}</p>
                </div>
                <p className={`${styles.name} text text_type_main-medium`}>{item.name}</p>
                { 
                    hasStatus && 
                    <p className={`${status === 'Выполнен' ? styles.status_type_done : styles.status} text text_type_main-default`}>
                        {status}
                    </p>
                }
                <div className={styles.cont}>
                    <ul className={` default-list`}>
                        {
                            renderIngrs()
                        }
                    </ul>
                    <PriceContainer total={price} />
                </div>
            </Link>
        </li>
    )
}

FeedItem.propTypes = {
    item: orderPropTypes.isRequired,
    hasStatus: PropTypes.bool.isRequired
}
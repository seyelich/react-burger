import { useDispatch, useLocation } from "../../services/hooks";
import { NavLink, useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import { ProfileForm } from "../../components/profile-form/profile-form";
import { ProfileOrders } from "../../components/profile-orders/profile-orders";
import { logout } from "../../services/actions/auth";
import styles from "./profile.module.css";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { pathname } = useLocation();

    const handleClick = () => {
        dispatch(logout(() => history.replace({ pathname: '/login' })));
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.links} mt-20`}>
                <ul className={`${styles.list} default-list`}>
                    <li>
                        <NavLink 
                            to={`${url}`} 
                            className={`${styles.link} text text_type_main-medium text_color_${pathname === `${url}` ? 'primary' : 'inactive'}`}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={`${url}/orders`}
                            className={
                                `${styles.link} text text_type_main-medium text_color_${pathname === `${url}/orders` ? 'primary' : 'inactive'}`
                            }
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            className={`${styles.btn} text text_type_main-medium text_color_inactive`}
                            onClick={handleClick} 
                        >
                            Выход
                        </button>
                    </li>
                </ul>
                <p className="mt-20 text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Switch>
                <Route path="/profile" exact={true} >
                    <ProfileForm />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                    <ProfileOrders />
                </Route>
            </Switch>
        </div>
    )
}
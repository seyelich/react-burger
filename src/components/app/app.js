import { useEffect } from 'react';
import AppHeader from '../header/header';
import Main from "../main/main";
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPwPage from '../../pages/forgot-pw/forgot-pw';
import ResetPwPage from '../../pages/reset-pw/reset-pw';
import ProfilePage from '../../pages/profile/profile';
import NotFound from '../../pages/not-found/not-found';
import { ProtectedRoute } from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { FeedPage } from '../../pages/feed/feed';
import { OrderInfo } from '../order-info/order-info';


export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const background = location.state?.bg;
    const num = location.state?.num;
    const profileExact = location.state === null ? false : true;

    function handleCloseModal() {
        history.goBack();
    }

    useEffect(() => { dispatch(getItems()) }, [dispatch]);
    
    return (
        <>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <Main />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPwPage />
                </Route>
                <Route path="/reset-password" exact={true}>
                    <ResetPwPage />
                </Route>
                <ProtectedRoute path="/profile" exact={profileExact}>
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <IngredientDetails />
                </Route>
                <Route path="/feed" exact={true} >
                    <FeedPage />
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <OrderInfo />
                </Route>
                <ProtectedRoute path="/profile/orders/:id" exact={true}>
                    <OrderInfo />
                </ProtectedRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            { background && (
                <>
                    <Route path="/ingredients/:id">
                        <Modal handleClose={handleCloseModal} title='Детали ингредиента' hasOverlay={true} titleClassName="text_type_main-large">
                            <IngredientDetails />
                        </Modal>
                    </Route>
                    <Route path="/feed/:id">
                        <Modal handleClose={handleCloseModal} title={num} hasOverlay={true} titleClassName="text_type_digits-default">
                            <OrderInfo />
                        </Modal>
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id" >
                        <Modal handleClose={handleCloseModal} title={num} hasOverlay={true} titleClassName="text_type_digits-default">
                            <OrderInfo />
                        </Modal>
                    </ProtectedRoute>
                </>
            )}
        </>
    )
}
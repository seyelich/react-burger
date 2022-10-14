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
import { DELETE_ITEM_INFO } from '../../services/actions/modals';


export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const background = location.state?.bg;

    function handleCloseModal() {
        dispatch({type: DELETE_ITEM_INFO});
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
                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <IngredientDetails />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            { background && (
                <Route path="/ingredients/:id">
                    <Modal handleClose={handleCloseModal} title='Детали ингредиента' hasOverlay={true} >
                        <IngredientDetails />
                    </Modal>
                </Route>
            )}
        </>
        
    )
}
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { login } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";
import { useLocation } from '../../services/hooks';

export default function LoginPage() {
    const { values, handleChange } = useForm({ email: '', pw: ''});
    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const location = useLocation();

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(values));
    }

    if(getCookie('accessToken')) {
        return (
            <Redirect to={location?.state?.from.pathname || '/'} />
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Вход</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <Input type="email" placeholder="E-mail" name="email" value={values.email} onChange={handleChange} />
                    <PasswordInput value={values.pw} name="pw" onChange={handleChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Войти</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className="link" to="/register">Зарегистрироваться</Link></p>
            <p className="mt-4 text text_type_main-default text_color_inactive">Забыли пароль? <Link className="link" to="/forgot-password">Восстановить пароль</Link></p>
        </div>
    )
}
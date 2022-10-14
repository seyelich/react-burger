import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from "../../components/utils/utils";
import { login } from "../../services/actions/auth";

export default function LoginPage() {
    const [ form, setForm ] = useState({
        email: '',
        pw: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const onFormChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form, () => history.replace({ pathname: '/' })));
    }

    if(getCookie('refreshToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Вход</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <Input type="email" placeholder="E-mail" name="email" value={form.email} onChange={onFormChange} />
                    <PasswordInput value={form.pw} name="pw" onChange={onFormChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Войти</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className="link" to="/register">Зарегистрироваться</Link></p>
            <p className="mt-4 text text_type_main-default text_color_inactive">Забыли пароль? <Link className="link" to="/forgot-password">Восстановить пароль</Link></p>
        </div>
    )
}
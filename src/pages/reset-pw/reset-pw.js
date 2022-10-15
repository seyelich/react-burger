import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { resetPw } from "../../services/actions/auth";

export default function ResetPwPage() {
    const { user } = useSelector(store => store.user);
    const [ form, setForm ] = useState({
        pw: '',
        token: ''
    })

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
        dispatch(resetPw(form, () => history.replace({ pathname: '/login'})));
    }

    if(getCookie('refreshToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    if(user.email === '') {
        return (
            <Redirect to={{pathname: '/forgot-password'}}/>
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <PasswordInput value={form.pw} name="pw" onChange={onFormChange} placeholder="Введите новый пароль" />
                    <Input value={form.token} name="token" type="text" placeholder="Введите код из письма" size="default" onChange={onFormChange}/>
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Сохранить</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="link" to="/login">Войти</Link></p>
        </div>
    )
}
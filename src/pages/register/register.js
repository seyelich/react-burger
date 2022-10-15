import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { register } from "../../services/actions/auth";

export default function RegisterPage() {
    const history = useHistory();
    const [ form, setForm ] = useState({
        name: '',
        email: '',
        pw: ''
    });

    const dispatch = useDispatch();

    const onFormChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(register(form, () => history.replace({ pathname: '/' })))
    }

    if(getCookie('refreshToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Регистрация</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <Input type="text" placeholder="Имя" name="name" value={form.name} onChange={onFormChange} />
                    <Input type="email" placeholder="E-mail" name="email" value={form.email} onChange={onFormChange} />
                    <PasswordInput name="pw" value={form.pw} onChange={onFormChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Зарегистрироваться</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className="link" to="/login">Войти</Link></p>
        </div>
    )
}
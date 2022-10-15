import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { forgotPw } from "../../services/actions/auth";
import styles from './forgot-pw.module.css';

export default function ForgotPwPage() {
    const [ form, setForm ] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const onFormChange = (e) => {
        setForm(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPw(form, () => history.replace({ pathname: '/reset-password' })));
    }

    if(getCookie('refreshToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <fieldset className={`${styles.fieldset} mb-6 mt-6`}>
                    <Input type="email" placeholder="Укажите e-mail" value={form} onChange={onFormChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Восстановить</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
        </div>
    )
}
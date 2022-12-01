import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { resetPw } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";

export default function ResetPwPage() {
    const { user } = useSelector(store => store.user);
    const { values, handleChange } = useForm({ pw: '', token: ''});
    
    const dispatch = useDispatch();
    const history = useHistory();

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPw(values, () => history.replace({ pathname: '/login'})));
    }

    if(getCookie('accessToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    if(!user.email) {
        return (
            <Redirect to={{pathname: '/forgot-password'}}/>
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <PasswordInput value={values.pw} name="pw" onChange={handleChange} placeholder="Введите новый пароль" />
                    <Input value={values.token} name="token" type="text" placeholder="Введите код из письма" size="default" onChange={handleChange}/>
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Сохранить</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="link" to="/login">Войти</Link></p>
        </div>
    )
}
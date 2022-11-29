import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { register } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);
    
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        pw: ''
    });

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(register(values));
    }

    if(getCookie('accessToken') || user) {
        return (
            <Redirect to={'/'} />
        )
    }

    return (
        <div className="container">
            <h1 className='text text_type_main-medium'>Регистрация</h1>
            <form className="form" onSubmit={onFormSubmit}>
                <fieldset className="fieldset mb-6 mt-6">
                    <Input type="text" placeholder="Имя" name="name" value={values.name} onChange={handleChange} />
                    <Input type="email" placeholder="E-mail" name="email" value={values.email} onChange={handleChange} />
                    <PasswordInput name="pw" value={values.pw} onChange={handleChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Зарегистрироваться</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className="link" to="/login">Войти</Link></p>
        </div>
    )
}
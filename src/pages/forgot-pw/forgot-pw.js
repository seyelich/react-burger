import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { getCookie } from "../../utils/utils";
import { forgotPw } from "../../services/actions/auth";
import styles from './forgot-pw.module.css';
import { useForm } from "../../hooks/useForm";

export default function ForgotPwPage() {
    const { values, handleChange } = useForm({email: ''});
    
    const history = useHistory();
    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPw(values.email, () => history.replace({ pathname: '/reset-password' })));
    }

    if(getCookie('accessToken')) {
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <fieldset className={`${styles.fieldset} mb-6 mt-6`}>
                    <Input type="email" name="email" placeholder="Укажите e-mail" value={values.email} onChange={handleChange} />
                </fieldset>
                <Button type='primary' size="large" htmlType="submit">Восстановить</Button>
            </form>
            <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
        </div>
    )
}
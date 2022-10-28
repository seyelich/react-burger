import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { getUserInfo, updateUser } from "../../services/actions/auth";

export const ProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);
    const { values, handleChange, setValues } = useForm({
        name: '',
        email: '',
        pw: ''
    });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const pwRef = useRef(null);

    const isEqual = (field) =>  user && user[field] === values[field];

    const makeDisabled = () => {
        nameRef.current.classList.add('input__textfield-disabled');
        emailRef.current.classList.add('input__textfield-disabled');
        pwRef.current.classList.add('input__textfield-disabled');

        nameRef.current.disabled = true;
        emailRef.current.disabled = true;
        pwRef.current.disabled = true;
    }

    useEffect(() => {
        dispatch(getUserInfo());
        user && setValues({
            name: user?.name,
            email: user?.email,
            pw: user?.pw ? user?.pw : ''
        });
    }, [dispatch, user?.name, user?.email, user?.pw ]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data = !isEqual('name') ? { ...data, name: values.name } : data;
        data = !isEqual('email') ? { ...data, email: values.email } : data;
        data = !isEqual('pw') ? { ...data, pw: values.pw } : data;
        makeDisabled();
        dispatch(updateUser(data));
    }

    const onFormReset = () => {
        setValues({
            name: user?.name,
            email: user?.email,
            pw: user?.pw
        });
        makeDisabled();
    }

    const handleIconClick = (ref) => {
        const curr = ref.current;
        if(isEqual(curr.name)) {
            curr.disabled = false;
            curr.classList.remove('input__textfield-disabled');
        } else {
            curr.disabled = true;
            curr.classList.add('input__textfield-disabled');
            setValues({
                ...values,
                [curr.name]: user[curr.name]
            })
        }
        curr.focus();
    }

    return (
        <form className="ml-15 mt-20" onSubmit={onFormSubmit} >
            <fieldset className="fieldset mb-6" >
                <Input 
                    type="text" 
                    placeholder="Имя" 
                    icon={isEqual('name') ? "EditIcon" : "CloseIcon"} 
                    name="name" 
                    value={values.name} 
                    onChange={handleChange}
                    onIconClick={() => handleIconClick(nameRef)}
                    disabled={true}
                    ref={nameRef}
                />
                <Input 
                    type="text" 
                    placeholder="Логин" 
                    icon={isEqual('email') ? "EditIcon" : "CloseIcon"} 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange}
                    onIconClick={() => handleIconClick(emailRef)}
                    disabled={true}
                    ref={emailRef}
                />
                <Input 
                    type="password" 
                    placeholder="Пароль" 
                    icon={isEqual('pw') ? "EditIcon" : "CloseIcon"} 
                    name="pw" 
                    value={values.pw} 
                    onChange={handleChange}
                    onIconClick={() => handleIconClick(pwRef)}
                    disabled={true}
                    ref={pwRef}
                />
            </fieldset>
            {
                (!isEqual('name') || !isEqual('email') || !isEqual('pw')) &&
                <>
                    <Button onClick={onFormReset} type='secondary' htmlType="button">Отмена</Button>
                    <Button htmlType="submit">Сохранить</Button>
                </>
            }
        </form>
    )
}
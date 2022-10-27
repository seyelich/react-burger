import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, updateUser } from "../../services/actions/auth";

export const ProfileForm = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.user);
    const [ form, setForm ] = useState({
        name: '',
        email: '',
        pw: ''
    });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const pwRef = useRef(null);

    const isEqual = (field) =>  user && user[field] === form[field];

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
        user && setForm({
            name: user?.name,
            email: user?.email,
            pw: user?.pw ? user?.pw : ''
        });
    }, [dispatch, user?.name, user?.email, user?.pw ]);

    const onFormChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data = !isEqual('name') ? { ...data, name: form.name } : data;
        data = !isEqual('email') ? { ...data, email: form.email } : data;
        data = !isEqual('pw') ? { ...data, pw: form.pw } : data;
        makeDisabled();
        dispatch(updateUser(data));
    }

    const onFormReset = () => {
        setForm({
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
            setForm({
                ...form,
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
                    value={form.name} 
                    onChange={onFormChange}
                    onIconClick={() => handleIconClick(nameRef)}
                    disabled={true}
                    ref={nameRef}
                />
                <Input 
                    type="text" 
                    placeholder="Логин" 
                    icon={isEqual('email') ? "EditIcon" : "CloseIcon"} 
                    name="email" 
                    value={form.email} 
                    onChange={onFormChange}
                    onIconClick={() => handleIconClick(emailRef)}
                    disabled={true}
                    ref={emailRef}
                />
                <Input 
                    type="password" 
                    placeholder="Пароль" 
                    icon={isEqual('pw') ? "EditIcon" : "CloseIcon"} 
                    name="pw" 
                    value={form.pw} 
                    onChange={onFormChange}
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
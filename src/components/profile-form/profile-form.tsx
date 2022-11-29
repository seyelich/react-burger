import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, RefObject, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { useForm } from "../../hooks/useForm";
import { getUserInfo, updateUser } from "../../services/actions/auth";
import { TUser } from "../../types";

export const ProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);
    const { values, handleChange, setValues } = useForm({
        name: '',
        email: '',
        pw: ''
    });

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const isEqual = (field: keyof TUser & string) =>  user && user[field] === values[field];

    const makeDisabled = () => {
        if(nameRef && emailRef && pwRef && pwRef.current && nameRef.current && emailRef.current) {
            nameRef.current.classList.add('input__textfield-disabled');
            emailRef.current.classList.add('input__textfield-disabled');
            pwRef.current.classList.add('input__textfield-disabled');

            nameRef.current.disabled = true;
            emailRef.current.disabled = true;
            pwRef.current.disabled = true;
        }
    }

    useEffect(() => {
        dispatch(getUserInfo());
        user && setValues({
            name: user?.name,
            email: user?.email!,
            pw: user?.pw ? user?.pw : ''
        });
    }, [dispatch, user?.name, user?.email, user?.pw ]);

    const onFormSubmit = (e: FormEvent) => {
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
            email: user?.email!,
            pw: user?.pw!
        });
        makeDisabled();
    }

    const handleIconClick = (ref: RefObject<HTMLInputElement>, field: keyof TUser) => {
        const curr = ref.current!;
        curr.name = field;
        if(isEqual(field)) {
            curr.disabled = false;
            curr.classList.remove('input__textfield-disabled');
        } else {
            curr.disabled = true;
            curr.classList.add('input__textfield-disabled');
            setValues({
                ...values,
                [curr.name]: user[field]!
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
                    onIconClick={() => handleIconClick(nameRef, 'name')}
                    disabled={true}
                    ref={nameRef}
                />
                <Input 
                    type="text" 
                    placeholder="Логин" 
                    icon={isEqual('email') ? "EditIcon" : "CloseIcon"} 
                    name="email" 
                    value={values.email!} 
                    onChange={handleChange}
                    onIconClick={() => handleIconClick(emailRef, 'email')}
                    disabled={true}
                    ref={emailRef}
                />
                <Input 
                    type="password" 
                    placeholder="Пароль" 
                    icon={isEqual('pw') ? "EditIcon" : "CloseIcon"} 
                    name="pw" 
                    value={values.pw!} 
                    onChange={handleChange}
                    onIconClick={() => handleIconClick(pwRef, 'pw')}
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
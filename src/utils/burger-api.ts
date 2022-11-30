import { adress } from "./constants";
import { getCookie } from "./utils";
import { TUser, ICustomResponse, TPromiseTypes } from "../types";

function checkResult(res: ICustomResponse<TPromiseTypes>) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(res)
}

function request(url: string, options?: RequestInit) {
    return fetch(url, options).then(checkResult)
}

export function getIngredients() {
    return request(`${adress}/ingredients`);
}

export function getOrderInfo(idArr: Array<string>) {
    return request(`${adress}/orders`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')!
        },
        body: JSON.stringify({
            ingredients: idArr
        })
    })
}

export function registerUser(user: TUser) {
    return request(`${adress}/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw, 
            name: user.name
        })
    })
}

export function loginUser(user: TUser) {
    return request(`${adress}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw
        })
    })
}

export function logoutUser() {
    return request(`${adress}/auth/logout`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function forgotPwUser(email: string) {
    return request(`${adress}/password-reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email
        })
    })
}

export function resetPwUser(form: { pw: string, token: string}) {
    return request(`${adress}/password-reset/reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: form.pw,
            token: form.token
        })
    })
}

export function getTokenRequest() {
    return request(`${adress}/auth/token`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function getUser() {
    return request(`${adress}/auth/user`, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')!
        }
    })
}

export function updateUserInfo(user: TUser) {
    return request(`${adress}/auth/user`, {
        method: 'PATCH',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')!
        },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw, 
            name: user.name
        })
    })
}

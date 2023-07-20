import { adress } from "./constants";
import { getCookie } from "./utils";
import { TUser } from "../types";
import { IAuthRes, IGetIngrsRes, IGetOrderRes, IGetTokenRes, IPwRequestRes } from "../services/types/data";
import { TResponse } from '../types'

const checkResponse = <T>(res: Response) => {
    return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};
  
function request<T>(url: string, options?: RequestInit) {
    return fetch(url, options).then(res => checkResponse<T>(res))
}

export function getIngredients() {
    return request<IGetIngrsRes>(`${adress}/ingredients`);
}

export function getOrderInfo(idArr: Array<string>) {
    return request<IGetOrderRes>(`${adress}/orders`, {
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
    return request<IAuthRes>(`${adress}/auth/register`, {
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
    return request<IAuthRes>(`${adress}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw
        })
    })
}

export function logoutUser() {
    return request<IPwRequestRes>(`${adress}/auth/logout`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function forgotPwUser(email: string) {
    return request<IPwRequestRes>(`${adress}/password-reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email
        })
    })
}

export function resetPwUser(form: { pw: string, token: string}) {
    return request<IPwRequestRes>(`${adress}/password-reset/reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: form.pw,
            token: form.token
        })
    })
}

export function getTokenRequest() {
    return request<IGetTokenRes>(`${adress}/auth/token`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function getUser() {
    return request<IAuthRes>(`${adress}/auth/user`, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')!
        }
    })
}

export function updateUserInfo(user: TUser) {
    return request<IAuthRes>(`${adress}/auth/user`, {
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

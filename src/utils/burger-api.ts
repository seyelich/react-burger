import { adress } from "./constants";
import { getCookie } from "./utils";
import { IGetOrderRes, IGetIngrsRes, IAuthRes, IPwRequestRes, IGetTokenRes } from '../services/types/data'
import { TUser } from "../types";

function checkResult(res: Response) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(res)
}

function request(url: string, options?: RequestInit) {
    return fetch(url, options).then(checkResult)
}

export function getIngredients(): Promise<IGetIngrsRes> {
    return request(`${adress}/ingredients`);
}

export function getOrderInfo(idArr: Array<string>): Promise<IGetOrderRes> {
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

export function registerUser(user: TUser): Promise<IAuthRes> {
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

export function loginUser(user: TUser): Promise<IAuthRes> {
    return request(`${adress}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw
        })
    })
}

export function logoutUser(): Promise<IPwRequestRes> {
    return request(`${adress}/auth/logout`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function forgotPwUser(email: string): Promise<IPwRequestRes> {
    return request(`${adress}/password-reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email
        })
    })
}

export function resetPwUser(form: { pw: string, token: string}): Promise<IPwRequestRes> {
    return request(`${adress}/password-reset/reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: form.pw,
            token: form.token
        })
    })
}

export function getTokenRequest(): Promise<IGetTokenRes> {
    return request(`${adress}/auth/token`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
}

export function getUser(): Promise<IAuthRes> {
    return request(`${adress}/auth/user`, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')!
        }
    })
}

export function updateUserInfo(user: TUser): Promise<IAuthRes> {
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

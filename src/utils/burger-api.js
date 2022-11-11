import { adress } from "./constants";
import { getCookie } from "./utils";

function checkResult(res) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(res)
}

function request(url, options) {
    return fetch(url, options).then(checkResult)
}

export function getIngredients() {
    return request(`${adress}/ingredients`);
}

export function getOrderInfo(idArr) {
    return request(`${adress}/orders`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json" ,
            Authorization: getCookie('accessToken')
        },
        body: JSON.stringify({
            ingredients: idArr
        })
    })
}

export function registerUser(user) {
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

export function loginUser(user) {
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

export function forgotPwUser(email) {
    return request(`${adress}/password-reset`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email
        })
    })
}

export function resetPwUser(form) {
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
            Authorization: getCookie('accessToken')
        }
    })
}

export function updateUserInfo(user) {
    return request(`${adress}/auth/user`, {
        method: 'PATCH',
        headers: { 
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken')
        },
        body: JSON.stringify({
            email: user.email, 
            password: user.pw, 
            name: user.name
        })
    })
}

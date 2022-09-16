import { adress } from "./utils";

function checkResult(res) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ingredients: idArr
        })
    })
}
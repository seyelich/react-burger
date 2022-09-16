import { adress } from "./utils";

function checkResult(res) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
}

export function getIngredients() {
    return fetch(`${adress}/ingredients`)
        .then(res => checkResult(res))
        .catch(err => console.log(err))
}

export function getOrderInfo(idArr) {
    return fetch(`${adress}/orders`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ingredients: idArr
        })
    })
        .then(res => checkResult(res))
        .catch(err => console.log(err))
}
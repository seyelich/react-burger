import { adress } from "./utils";

function checkResult(res) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
}

export default function getIngredients(setState, state) {
    return fetch(`${adress}/ingredients`)
        .then(res => checkResult(res))
        .then(res => 
            setState({
                ...state, 
                data: res.data.map((el) => {
                    return { ...el, qty: 0}
                })
            })
        )
        .catch(err => console.log(err))
}

export function getOrderNumber(idArr, setState) {
    return fetch(`${adress}/orders`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ingredients: idArr
        })
    })
        .then(res => checkResult(res))
        .then(res => setState(res.order.number))
}
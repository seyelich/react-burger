import { adress } from "./utils";

function checkResult(res) {
    if(res.ok) { 
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
}

export default function getIngredients(setData) {
    return fetch(adress)
        .then(res => checkResult(res))
        .then(res => setData(res.data))
        .catch(err => console.log(err))
}
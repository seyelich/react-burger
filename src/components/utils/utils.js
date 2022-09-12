export const adress = 'https://norma.nomoreparties.space/api';
export const modalRoot = document.getElementById("react-modals");

export function countPrice(data) {
    return data.reduce((arr, curr) =>
        arr += curr.type === 'bun' ? curr.price*2 : curr.price, 0
    )
}
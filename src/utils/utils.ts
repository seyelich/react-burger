import { TIngr, TSetCookieProps } from "../types";

export function countPrice(data: ReadonlyArray<TIngr>) {
    return data.reduce((arr, curr) =>
        arr += curr.type === 'bun' ? curr.price*2 : curr.price,
        0)
}

export function countPriceForFeed(data: Array<TIngr>) {
    return data.reduce((arr, curr) =>
        arr += curr.price,
        0)
}

export const setOrderIngrs = (arr1: ReadonlyArray<string>, arr2: ReadonlyArray<TIngr>)=> arr1?.map(el => arr2.find(i => el === i._id)!);

export const setItems = (arr: Array<TIngr>) => {
    return arr.reduce((acc: {ingr: {[id: string]: TIngr}, qty: {[id: string]: number}}, el) => {
        const id = el._id
        acc.ingr[id] = el;
        acc.qty[id] = (acc.qty[id] || 0) + 1
        return acc
    }, { ingr: {}, qty: {} })
}

export const setStatusText = (val: string) => {
    switch (val) {
        case 'done':
            return 'Выполнен';

        case 'pending':
            return 'Готовится';

        case 'created':
            return 'Создан';
    
        default:
            return '';
    }
}

const getDay = (diff: number) => {
    if(diff < 1) {
        return 'Сегодня'
    }
    else if(diff === 1) {
        return 'Вчера'
    }
    else {
        return `${diff} дня(-ей) назад`
    }
}

export const setDate = (val: string) => {
    const createdDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((today.getTime() - createdDate.getTime())/86400000);

    const hours = createdDate.getHours() <= 9 ? `0${createdDate.getHours()}` : createdDate.getHours()
    const minutes = createdDate.getMinutes() <= 9 ? `0${createdDate.getMinutes()}` : createdDate.getMinutes()

    return `${getDay(diff)}, ${hours}:${minutes}, i-GMT+${createdDate.getTimezoneOffset()*(-1)/60}`;
}

export function setCookie(name: string, value: string | number | boolean | undefined, props?: TSetCookieProps) {
    props = { ...props, path: "/" };
    
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (typeof exp == 'object' && exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value!);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, false, { expires: -1 });
}

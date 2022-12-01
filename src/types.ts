export type TIngr = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    qty: number,
    key?: number
}

export type TOrder = {
    createdAt: string, 
    ingredients: ReadonlyArray<string>,
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

export type TUser = {
    email: string,
    pw: string,
    name: string
}

export type TSetCookieProps = {[props: string]: string | boolean | number | Date | null} //КОСТЫЛЬ

export type TResponse<T> = {
    success: boolean;
} & T;
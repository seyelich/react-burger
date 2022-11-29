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

export interface ICnstrItem {
    item: TIngr,
    index: number,
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

export interface IModal extends React.HTMLAttributes<HTMLDivElement> { //?????
    handleClose: () => void, 
    title?: string, 
    hasOverlay: boolean,
    titleClassName?: string,
}

export type TSetCookieProps = {[props: string]: string | boolean | number | Date | null} //КОСТЫЛЬ

export type TUser = {
    email?: string,
    pw?: string,
    name: string
} | {[field: string]: string}
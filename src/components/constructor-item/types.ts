import { TIngr } from "../../types"

export interface ICnstrItem {
    item: TIngr,
    index: number,
    moveItem: (dragIndex: number, hoverIndex: number) => void
}
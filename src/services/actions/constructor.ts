import { TIngr } from "../../types"
import { 
    GET_CHOSEN_ITEMS, 
    SET_TOTAL_PRICE,
    DELETE_ITEM,
    MOVE_ITEM,
    CLEAR_CONSTRUCTOR
} from "../constants/constructor"

export interface IGetChosenItemsAction {
    readonly type: typeof GET_CHOSEN_ITEMS,
    readonly payload: TIngr,
    readonly key: number
}

export interface ISetTotalPriceAction {
    readonly type: typeof SET_TOTAL_PRICE,
    readonly payload: number
}

export interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM,
    readonly payload: TIngr,
}

export interface IMoveItemAction {
    readonly type: typeof MOVE_ITEM,
    readonly dragIndex: number,
    readonly hoverIndex: number,
}

export interface IClearCnstrAction {
    readonly type: typeof CLEAR_CONSTRUCTOR
}

export type TCnstrActions =
    | IGetChosenItemsAction
    | ISetTotalPriceAction
    | IDeleteItemAction
    | IMoveItemAction
    | IClearCnstrAction
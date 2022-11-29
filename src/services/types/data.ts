import { TIngr, TOrder, TUser } from "../../types"

export interface IGetIngrsRes {
    data: ReadonlyArray<TIngr>, //Readonly
    success: boolean
}

export interface IGetOrderRes {
    success: boolean,
    order: TOrder,
    name: string
}

export interface IAuthRes {
    success: boolean,
    user: TUser,
    accessToken?: string,
    refreshToken?: string
}

export interface IPwRequestRes   {
    success: boolean,
    message: string
}

export interface IGetTokenRes {
    success: boolean,
    accessToken: string
    refreshToken: string
  }

export interface IOrdersInfo {
    orders: Array<TOrder>, //
    total: string,
    totalToday: string
}


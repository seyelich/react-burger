import { TIngr, TOrder, TUser } from "../../types"

export interface IGetIngrsRes {
    data: ReadonlyArray<TIngr>
}

export interface IGetOrderRes {
    order: TOrder,
    name: string
}

export interface IAuthRes {
    user: TUser,
    accessToken?: string,
    refreshToken?: string
}

export interface IPwRequestRes   {
    message: string
}

export interface IGetTokenRes {
    accessToken: string
    refreshToken: string
  }

export interface IOrdersInfo {
    orders: Array<TOrder>,
    total: string,
    totalToday: string
}

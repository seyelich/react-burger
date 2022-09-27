import { GET_CHOSEN_ITEMS, SET_TOTAL_PRICE, DELETE_ITEM, MOVE_ITEM, CLEAR_CONSTRUCTOR, MAKE_KEY } from '../actions/constructor';

const initialState = {
    chosenItems: [],
    price: 0
}

export const constructorReducer = (state = initialState, action) => {
    function addBun(state, action) {
        const index = [...state.chosenItems].findIndex((el) => el.type === 'bun');
        const newState = [...state.chosenItems];
    
        if(index !== -1) {
            newState[index] = {...action.payload, key: action.key}
            return newState
        }
        else {
            return [...state.chosenItems, {...action.payload, key: action.key}]
        }
    }

    switch (action.type) {
        case GET_CHOSEN_ITEMS: {
            return {
                ...state,
                chosenItems: action.payload.type !== 'bun' ? 
                    [...state.chosenItems, {...action.payload, key: action.key}]
                    : addBun(state, action)
            }
        }

        case SET_TOTAL_PRICE: {
            return {
                ...state, 
                price: action.payload
            }
        }

        case DELETE_ITEM: {
            return { 
                ...state, 
                chosenItems: [...state.chosenItems].filter((el, index, arr) => {
                    if(el._id !== action.payload._id) {
                        return el
                    }
                    else if(index !== arr.indexOf(action.payload) && el._id === action.payload._id) {
                        return el
                    }
                })
            }
        }

        case MOVE_ITEM: {
            const notBun = [...state.chosenItems].filter(el => el.type !== 'bun'); //optimize
            const bun = [...state.chosenItems].filter(el => el.type === 'bun');
            notBun.splice(action.hoverIndex, 0, notBun.splice(action.dragIndex, 1)[0]);
            return {
                ...state,
                chosenItems: notBun.concat(bun)
            }
        }

        case CLEAR_CONSTRUCTOR: {
            return { ...state, chosenItems: [] }
        }

        default: {
            return state;
        }
    }
}

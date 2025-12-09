
import { ACTION_TYPES } from "../actions/KuormaTyyppi";
const inititalState = {
    list2: []
}

export const KuormaTyyppi = (state = inititalState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_FORCETYPE:
            return {
                ...state,
                list2: [...action.payload]
            }


        default:
            return state
    }
}

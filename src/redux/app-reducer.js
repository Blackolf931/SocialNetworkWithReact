import {getAuthUserData} from "./auth-reducer";

const INITIALZED_SUCCESS = 'INITIALZED_SUCCESS';

let initialState = {
    initialized: false,
    globalError: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default :
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}

export default appReducer;




const initialState = {
    username: '',
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUser( user ){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: {
            username: '',
            profile_pic: ''
        }
    }
}

export default function reducer( state = initialState, action ){
    switch(action.type){
        case UPDATE_USER:
            return { ...state, ...action.payload }
        case LOGOUT_USER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
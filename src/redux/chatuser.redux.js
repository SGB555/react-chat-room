import axios from 'axios'

// action 
const USER_LIST = 'USER_LIST'

const initState = {
    userList: []
}
//reducer
export function chatUser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userList: action.payload }
        default:
            return state
    }
}

// action creator
function userList(data) {
    return {
        type: USER_LIST, payload: data
    }
}
//opera function
export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type=' + type).then(res => {
            if (res.data.code === 0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}
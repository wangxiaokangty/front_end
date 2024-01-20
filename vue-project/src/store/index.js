import {createStore} from 'vuex'


const store = createStore({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }
    },
    mutations: {
        // set
        SET_TOKEN: (state, token) => {
            console.log("sha")
            console.log(token)
            state.token = token
            console.log(state.token)
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }
    },
    actions: {},
    modules: {}
})

export default store;

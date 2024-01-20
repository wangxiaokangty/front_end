import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from './router'
import store from './store'

// axios.defaults.baseURL = "/https://mock.apifox.com/m1/3650195-0-default"
axios.defaults.baseURL = "http://8.130.82.194:8080"

// 前置拦截
axios.interceptors.request.use((config) => {
        config.headers.token = localStorage.getItem('token')
        return config
    },
    (err) => {
        //请求错误的回调
        Promise.reject(err)
    })

axios.interceptors.response.use(response => {
        let res = response.data;


        if (res.code === 401) {


            router.push("/BlogLogin")
            return response
        }

        if (res.code === 201) {
            return response
        } else {

            ElMessage.error('出现了一条错误信息')

            return response

        }
    },
    error => {
        if (error.response.data) {
            error.message = error.response.data.msg
        }

        if (error.code === 401) {
            store.commit("REMOVE_INFO")
            router.push("/BlogLogin")
        }

        ElMessage.error('Oops, this is a error message.')
        return Promise.reject(error)
    }
)

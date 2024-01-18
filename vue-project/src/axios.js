import axios from 'axios'
import ElementPlus from "element-plus"
import { ElMessage } from 'element-plus'
import router from './router'
import store from './store'


axios.defaults.baseURL = /* "http://localhost:8080" */"https://mock.apifox.com/m1/3650195-0-default"

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("=================")
        console.log(res)
        console.log("=================")

        if (res.code === 201) {
            return response
        } else {

            ElMessage.error('出现了一条错误信息')

            return response

        }
    },
    error => {
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }

        if(error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }

        ElMessage.error('Oops, this is a error message.')
        return Promise.reject(error)
    }
)

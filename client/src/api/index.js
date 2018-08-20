import axios from 'axios'
import qs from 'qs'
import vueInstance from '@/main'
const apiGet = axios.create()
const apiPost = axios.create({
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" }
})
function setAuthor() {
    console.log(localStorage.getItem("author"))
    if (localStorage.getItem("author")) {
        // console.log(localStorage.getItem("author"))
        // //再次添加axios请求的头的内容
        // apiGet.defaults.headers.common["author"] = localStorage.getItem("author")
        // apiPost.defaults.headers.common["author"] = localStorage.getItem("author")
        // apiGet.interceptors.request.use((config) => {
        //     return config
        // })
        apiGet.interceptors.request.use((config => {
            // console.log(config)
            config.headers.common.author = localStorage.getItem("author")
            return config
        }))
        apiPost.interceptors.response.use((response) => {
            if (response.login && response.login === "failed") {
                vueInstance.$router.push("login")
            }
            console.log(response)
        })

    }
}
const service = {
    login: (user) => {
        return apiPost.post('http://127.0.0.1:3000/login', qs.stringify(user)).then((response) => {
            console.log(response.headers)
            var author = response.headers.author
            if (author) {
                localStorage.setItem("author", author)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    home: () => {
        setAuthor()
        return apiGet.get('http://127.0.0.1:3000/home').then((res) => {
            console.log(res.data)
        })
    }

}
export default service
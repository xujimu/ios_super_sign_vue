import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
import axios from 'axios'

Vue.prototype.$http = axios
// 添加证书的使用教程
Vue.prototype.addCertHelp = "https://www.baidu.com/"


axios.defaults.baseURL = ''

console.log(window.document.domain)

// 需要设置为真不然sesion会变动
axios.defaults.withCredentials = true




Vue.prototype.$load =load;
Vue.prototype.$getHeader = getHeader;


function getHeader(){

  let user = window.localStorage.getItem("user");
  console.log("获取header")

  if(null != user){
    console.log("有token")
    user = JSON.parse(user);
    return {token: user.token}
  }
  return {}
}

// Vue.use(ElementUI)
function load(is,msg) {
  if (is === 1) {
    this.$loading({
      lock: true,
      text: msg,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  } else {
    this.$loading({
      lock: true,
      text: msg,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }).close();
  }
}

axios.interceptors.request.use(function (config) {

  let user = window.localStorage.getItem("user");
  console.log("全局拦截")
  console.log(user)
  if(null != user){
    console.log("有token")
    user = JSON.parse(user);
    config.headers.token = user.token
  }
  return config
})


axios.interceptors.response.use(function (config) {
  console.log(config.data)
  if (config.data.code === 4) {
    Vue.prototype.$message("请登录")
    router.push('/login')
    window.localStorage.removeItem('user')
  }
  return config
},error => {
  Vue.prototype.$message("服务器错误")
  console.log("服务器错误")
})



// 判断登录状态
router.beforeEach((to,from,next) =>{
  if(to.path === '/login'){
    next()
  }else {
    if(window.localStorage.getItem("user") != null){
      next()
    }else {
      Vue.prototype.$message("请登录")
      router.push('/login')
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




import {createRouter,createWebHistory} from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SignupPage from './pages/SignupPage.vue'
import SignupDoctor from './pages/SignupDoctor.vue'
import LoginPage1 from './pages/LoginPage1.vue'
import LoginPage2 from './pages/LoginPage2.vue'
import ForgetPassword1 from './pages/ForgetPassword1.vue'
import ForgetPassword2 from './pages/ForgetPassword2.vue'
import ResetPassword1 from './pages/ResetPassword1.vue'
import ResetPassword2 from './pages/ResetPassword2.vue'
import LandingPage from './pages/LandingPage.vue'
import DashUser from './pages/DashUser.vue'
import DashMed from './pages/DashMed.vue'
import ProfileUser from './pages/ProfileUser.vue'
import SearchPage1 from './pages/SearchPage1.vue'
import DoctorPage from './pages/DoctorPage.vue'

const routes=[
    {path:'/',component:HomePage,name:'HomePage'},
    {path:'/signup',component:SignupPage,name: 'SignupPage'},
    {path:'/signup-doc',component:SignupDoctor,name:'SignupDoctor'},
    {path:'/login1',component:LoginPage1,name:'LoginPage1'},
    {path:'/login',component:LoginPage2,name:'LoginPage2'},
    {path:'/fg-pass1',component:ForgetPassword1,name:'ForgetPassword1'},
    {path:'/fg-pass2',component:ForgetPassword2,name:'ForgetPassword2'},
    {path:'/reset-pass1/:email',component:ResetPassword1,name:'ResetPassword1'},
    {path:'/reset-pass2/:email',component:ResetPassword2,name:'ResetPassword2'},
    {path:'/landing-page/:userId',component:LandingPage,name:'LandingPage'},
    {path:'/DashUser/:userId',component:DashUser,name:'DashUser'},
    {path:'/DashMed/:medecinId',component:DashMed,name:'DashMed'},
    {path:'/ProfileUser',component:ProfileUser,name:'ProfileUser'},
    {path:'/search-page/:userId/:input1/:input2',component:SearchPage1,name:'SearchPage1'} ,
    {path:'/doc-page/:input1/:input2',component:DoctorPage,name:'DoctorPage'} ,
]
const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router

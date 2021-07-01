import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/index/Login'
import Home from '../views/index/Home'
import Introduct from '../views/index/introduct'
import Temperature from './temperature'
import CityBrain from './citybrain'
import dataSource from './dataSource'
import camera from './camera'
import Sensor from './sensor'
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home,children:[
          {path:'/introduct',component:Introduct},
          ...Temperature,
          ...CityBrain,
          ...dataSource,
          ...camera,
          ...Sensor,
    ]},

];

const router = new VueRouter({
  routes
});

export default router

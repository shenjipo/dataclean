import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import flights from '@/components/citybrain/traffic/flights'
import cars from '@/components/citybrain/traffic/cars'
import StructedDataInfo from '@/components/DataSource/StructedData/DataInfo'
import VideoDataInfo from '@/components/DataSource/VideoData/DataInfo'
import Introduct from '../components/introduct'
import Southcamera from '../components/camera/southcamera'
import Northcamera from '../components/camera/northcamera'
import Sensor1 from '../components/sensor/temperature/sensor001'
import Sensor2 from '../components/sensor/temperature/sensor002'
import Sensor3 from '../components/sensor/temperature/sensor003'
import Humidity1 from '../components/sensor/humidity/humidity001'
import Humidity2 from '../components/sensor/humidity/humidity002'
import Humidity3 from '../components/sensor/humidity/humidity003'

import Travel from '../components/citybrain/travel/travel'
import advantage from '@/components/DataSource/compare/advantage'
import advantageVisualization from '@/components/DataSource/compare/AdvantageVisualization'
import dataCleanResult from '@/components/DataSource/StructedData/dataCleanResult'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/introduct' },
  { path: '/login', component: Login },
  { path: '/home', component: Home,children:[
      {path:'/dataclean/citybrain/traffic/queryFilghtsData',component:flights},
      {path:'/dataclean/citybrain/traffic/queryCarsData',component:cars},
      {path:'/dataclean/datasource/StructedData/DataInfo',component:StructedDataInfo},
      {path:'/dataclean/datasource/VideoData/DataInfo',component:VideoDataInfo},
      {path:'/introduct',component:Introduct},
      {path:'/camera/southcamera', component: Southcamera},
      {path:'/camera/northcamera', component: Northcamera},
      {path:'/sensor/temperature/sensor001', component: Sensor1},
      {path:'/sensor/temperature/sensor002', component: Sensor2},
      {path:'/sensor/temperature/sensor003', component: Sensor3},
      {path:'/sensor/humidity/sensor001', component: Humidity1},
      {path:'/sensor/humidity/sensor002', component: Humidity2},
      {path:'/sensor/humidity/sensor003', component: Humidity3},
      {path:'/citybrain/travel/travel', component: Travel},
      {path:'/dataclean/datasource/dataCleanResult', component: dataCleanResult,children: [
          {path:'/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]},

    ]},

];

const router = new VueRouter({
  routes
});

export default router

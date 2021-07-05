import CO20001 from '../views/sensor/co2/co20001'
import Distance0001 from '../views/sensor/distance/distance0001'
import PM0001 from '../views/sensor/pm/pm0001'
import IO0001 from '../views/sensor/io/io0001'

import distanceAll from '../views/sensor/distance/distanceAll';
import CO2All from '../views/sensor/co2/CO2All';
import PM10All from '../views/sensor/PM10/PM10All'
import PM25All from '../views/sensor/PM25/PM25All'
import pressureAll from '../views/sensor/pressure/pressureAll'
import ch1All from '../views/sensor/temperature/ch1All'
import ch2All from '../views/sensor/temperature/ch2All'
import ch3All from '../views/sensor/temperature/ch3All'
import ch4All from '../views/sensor/temperature/ch4All'
import lightTemperatureAll from '../views/sensor/lightTemperature/lightTemperatureAll'

import distanceRealData from '../views/sensor/distance/distanceRealData'
import co2RealData from '../views/sensor/co2/co2RealData'
import lightTemperatureRealData from '../views/sensor/lightTemperature/lightTemperatureRealData'
import pm10RealData from '../views/sensor/PM10/pm10RealData'
import pm25RealData from '../views/sensor/PM25/pm25RealData'
import pressureRealData from '../views/sensor/pressure/pressureRealData'
import temperatureRealData from '../views/sensor/temperature/temperatureRealData'

import index from '../views/sensor/index'
export default [
  {
    path: 'index',
    component: index,
    name: 'index'
  },
  {
    path: 'ch1All',
    component: ch1All,
    name: 'ch1All'
  },
  {
    path: 'ch2All',
    component: ch2All,
    name: 'ch2All'
  },
  {
    path: 'ch3All',
    component: ch3All,
    name: 'ch3All'
  },
  {
    path: 'ch4All',
    component: ch4All,
    name: 'ch4All'
  },

  {
    path: 'lightTemperatureRealData',
    component: lightTemperatureRealData,
    name: 'lightTemperatureRealData'
  },
  {
    path: 'pm10RealData',
    component: pm10RealData,
    name: 'pm10RealData'
  },
  {
    path: 'pm25RealData',
    component: pm25RealData,
    name: 'pm25RealData'
  },
  {
    path: 'pressureRealData',
    component: pressureRealData,
    name: 'pressureRealData'
  },
  {
    path: 'temperatureRealData',
    component: temperatureRealData,
    name: 'temperatureRealData'
  },

  {
    path: 'co2RealData',
    component: co2RealData,
    name: 'co2RealData'
  },
  {
    path: 'distanceRealData',
    component: distanceRealData,
    name: 'distanceRealData'
  },
  {
    path: 'lightTemperatureAll',
    component: lightTemperatureAll,
    name: 'lightTemperatureAll'
  },

  {
    path: 'pressureAll',
    component: pressureAll,
    name: 'pressureAll'
  },
  {
    path: 'PM25All',
    component: PM25All,
    name: 'PM25All'
  },
  {
    path: 'PM10All',
    component: PM10All,
    name: 'PM10All'
  },
  {
    path: 'CO2All',
    component: CO2All,
    name: 'CO2All'
  },
  {
    path: '/sensor/co2/co20001',
    component: CO20001,
    name: 'CO20001'
  },
  {
    path: '/sensor/distance/distance0001',
    component: Distance0001,
    name: 'distance0001'
  },
  {
    path: '/sensor/pm/pm0001',
    component: PM0001,
    name: 'pm0001'
  },
  {
    path: '/sensor/io/io0001',
    component: IO0001,
    name: 'io0001'
  },
  {
    path: 'distanceAll',
    component: distanceAll,
    name: 'distanceAll'
  }
]

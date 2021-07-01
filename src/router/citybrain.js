import flights from '@/views/citybrain/traffic/flights'
import cars from '@/views/citybrain/traffic/cars'
import Travel from '../views/citybrain/travel/travel'
import flightData1 from '../views/citybrain/traffic/filightData1'
export default [
    {path:'/dataclean/citybrain/traffic/queryFilghtsData',component:flights},
    {path:'/dataclean/citybrain/traffic/queryCarsData',component:cars},
    {path:'/citybrain/travel/travel', component: Travel},
    {path: '/citybrain/traffic/flightData1', component: flightData1},
]

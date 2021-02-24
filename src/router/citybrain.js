import flights from '@/components/citybrain/traffic/flights'
import cars from '@/components/citybrain/traffic/cars'
import Travel from '../components/citybrain/travel/travel'
import flightData1 from '../components/citybrain/traffic/filightData1'
export default [
    {path:'/dataclean/citybrain/traffic/queryFilghtsData',component:flights},
    {path:'/dataclean/citybrain/traffic/queryCarsData',component:cars},
    {path:'/citybrain/travel/travel', component: Travel},
    {path: '/citybrain/traffic/flightData1', component: flightData1},
]

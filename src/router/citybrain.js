import flights from '@/components/citybrain/traffic/flights'
import cars from '@/components/citybrain/traffic/cars'
import Travel from '../components/citybrain/travel/travel'
export default [
    {path:'/dataclean/citybrain/traffic/queryFilghtsData',component:flights},
    {path:'/dataclean/citybrain/traffic/queryCarsData',component:cars},
    {path:'/citybrain/travel/travel', component: Travel},
]
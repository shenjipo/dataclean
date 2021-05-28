import CO20001 from '../components/sensor/co2/co20001'
import Distance0001 from  '../components/sensor/distance/distance0001'
import PM0001 from '../components/sensor/pm/pm0001'
import IO0001 from '../components/sensor/io/io0001'

export default [
    {path:'/sensor/co2/co20001', component: CO20001},
    {path:'/sensor/distance/distance0001',component: Distance0001},
    {path:'/sensor/pm/pm0001',component: PM0001},
    {path: '/sensor/io/io0001',component: IO0001}
]

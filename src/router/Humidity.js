import Humidity1 from '../components/sensor/humidity/humidity001'
import Humidity2 from '../components/sensor/humidity/humidity002'
import Humidity3 from '../components/sensor/humidity/humidity003'

export default [
    {path:'/sensor/humidity/sensor001', component: Humidity1},
    {path:'/sensor/humidity/sensor002', component: Humidity2},
    {path:'/sensor/humidity/sensor003', component: Humidity3},
]
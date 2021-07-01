import CO20001 from '../views/sensor/co2/co20001'
import Distance0001 from '../views/sensor/distance/distance0001'
import PM0001 from '../views/sensor/pm/pm0001'
import IO0001 from '../views/sensor/io/io0001'
import distanceAll from '../views/sensor/distance/distanceAll';

export default [
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

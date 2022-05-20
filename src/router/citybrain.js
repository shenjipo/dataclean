import flights from '@/views/citybrain/traffic/flights'
import trajectory_interpolation from '@/views/citybrain/traffic/trajectory_interpolation'
import Travel from '../views/citybrain/travel/travel'
import flightData1 from '../views/citybrain/traffic/filightData1'
import licensePlate from '../views/citybrain/traffic/licensePlate'
import mobileGps from '../views/citybrain/traffic/mobileGps'
import trajectoryDetail from '../views/citybrain/traffic/trajectoryDetail'
import trajectory_detection from '../views/citybrain/traffic/trajectory_detection'

export default [
    {path: '/dataclean/citybrain/traffic/queryFilghtsData', component: flights},
    {path: 'trajectory_interpolation', component: trajectory_interpolation, name: 'trajectory_interpolation'},
    {path: 'trajectory_detection', component: trajectory_detection, name: 'trajectory_detection'},
    {path: '/citybrain/travel/travel', component: Travel},
    {path: '/citybrain/traffic/flightData1', component: flightData1},
    {path: '/dataclean/citybrain/traffic/licensePlate', component: licensePlate},
    {path: '/dataclean/citybrain/traffic/mobileGps', component: mobileGps},
    {path: 'trajectoryDetail', component: trajectoryDetail, name: 'trajectoryDetail'},
]

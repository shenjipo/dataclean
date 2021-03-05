import advantageVisualization from '@/components/DataSource/compare/AdvantageVisualization'
import dataCleanResult from '@/components/DataSource/StructedData/dataCleanResult'
import StructedDataInfo from '@/components/DataSource/StructedData/DataInfo'
import VideoDataInfo from '@/components/DataSource/VideoData/DataInfo'
import trajectoryDataInfo from '@/components/DataSource/trajectoryData/dataInfo'
import trajectoryResult from '@/components/DataSource/trajectoryData/trajectoryResult'
import resultInMap from '@/components/DataSource/trajectoryData/resultInMap'
export default [
  {
    path: '/dataclean/datasource/StructedData/DataInfo', component: StructedDataInfo, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {path: '/dataclean/datasource/VideoData/DataInfo', component: VideoDataInfo},
  {
    path: '/dataclean/datasource/dataCleanResult', component: dataCleanResult, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {
    path: '/dataclean/datasource/dataCleanResult', component: dataCleanResult, children: [
      {path: '/dataclean/datasource/AdvantageVisualization', component: advantageVisualization}]
  },
  {path: '/dataclean/datasource/trajectoryData/DataInfo', component: trajectoryDataInfo},
  {
    path: '/dataclean/datasource/trajectoryData/trajectoryResult', component: trajectoryResult
  },
  {
    path: '/dataclean/datasource/trajectoryData/resultInMap', component: resultInMap
  },
]
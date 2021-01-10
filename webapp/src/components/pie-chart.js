import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Empty } from 'antd'
import PropTypes from 'prop-types'

const PieChart = ({ data }) => {
  if (data.length === 0) {
    return <Empty style={{ paddingTop: '5vh' }} />
  }
  return (
    <ResponsivePie
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      borderWidth={1}
      colors={{ scheme: 'accent' }}
      cornerRadius={3}
      data={data}
      innerRadius={0.5}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 70,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'bottom-to-top',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      padAngle={0.7}
      radialLabelsLinkColor={{ from: 'color' }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor='#333333'
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor='#333333'
    />
  )
}

PieChart.propTypes = {
  data: PropTypes.array
}

export default PieChart

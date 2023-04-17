import React from 'react'
import { LineWave, ThreeDots } from 'react-loader-spinner'

const ThreeDotSpinner = () => {
  return (
    <div className='flex justify-center'>
    <LineWave
  height="100"
  width="100"
  color="#636B6D"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>
</div>
  )
}

export default ThreeDotSpinner
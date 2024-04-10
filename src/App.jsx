import React from 'react'
import BarChart from './Barchart'

const App = () => {

  const data = [10, 20, 30, 40, 50,100,100,40];
  return (
    <>
      <BarChart data={data} width={400} height={300}/>
    </>
  )
}

export default App
import React from 'react'
import BarChart from './Barchart'

const App = () => {

  const data = [
    { month: 'January', sales: 100 },
    { month: 'February', sales: 150 },
    { month: 'March', sales: 200 },
    { month: 'April', sales: 175 },
    { month: 'May', sales: 120 },
  ];
  return (
    <>
      <div className="App">
        <h1>Bar Chart Example with D3.js</h1>
        <BarChart data={data} />
      </div>
    </>
  )
}

export default App
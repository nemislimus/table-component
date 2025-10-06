import { useState } from 'react'
import tableLogo from '/table_logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://google.com" target="_blank">
          <img src={tableLogo} className="logo" alt="Table logo" />
        </a>
      </div>
      <h1>Start Project Page</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count of clicks: {count}
        </button>
      </div>
    </>
  )
}

export default App

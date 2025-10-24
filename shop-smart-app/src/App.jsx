import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [currTime, setCurrTime] = useState(null);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrTime(data.time);
    })
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>ShopSmart</h1>
      <h3>Built with Vite + React</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>The current time is {currTime === null ? 'Unreachable' : new Date(currTime * 1000).toLocaleString()}</p>
        <p>If you see a time above, and not "Unreachable", then the api connection is working</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

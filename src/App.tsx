import { useState, JSX } from 'react'
import './App.css'

import { Button } from './components/buttons/Button'
import { Home } from './Pages/Home'


const views: { key: string, label: string, component: JSX.Element }[] = [
  { key: 'HOME', label: 'Home', component: <Home /> },
]


const components: { key: string, label: string, component: JSX.Element }[] = [
  { key: 'BUTTON', label: 'Button', component: <Button /> },
]



const allDisplays = [...views, ...components].reduce((acc, { key, component }) => {
  acc[key] = component
  return acc
}, {} as Record<string, JSX.Element>)

function App() {
  let [display, setDisplay] = useState<string>('BUTTON')

  return (
    <>
      <header className="header"> Header </header>
      <nav className='side-bar'>

        <ul>
          <h4>Views</h4>
          {views.map(({ key, label }) => (
            <li key={key}>
              <div onClick={() => setDisplay(key)}>{label}</div>
            </li>
          ))}

          <h4>Components</h4>

          {components.map(({ key, label }) => (
            <li key={key}>
              <div onClick={() => setDisplay(key)}>{label}</div>
            </li>
          ))}

        </ul>

      </nav >
      <div className='display'>


        <div className='card'>

          {allDisplays[display]}
        </div>
      </div>
      <footer className='footer'>Footer </footer>
    </>
  )
}

export default App

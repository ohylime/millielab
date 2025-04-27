import { useState, JSX } from 'react'
import './App.css'

import { Button } from './components/buttons/Button'

const Components: Record<string, JSX.Element> = {
  BUTTON: <Button />,
  HOME: <h1>Home</h1>,
}

function App() {
  let [display, setDisplay] = useState<'BUTTON' | 'HOME'>('BUTTON')

  return (
    <>
      <div> Header </div>
      <div className='sideBar'>


      </div>
      <div className='display'>

        <div>
          Welcome to MillieLab
        </div>

        <Button onClick={() => setDisplay('BUTTON')}>Button</Button>
        <Button onClick={() => setDisplay('HOME')}>Home</Button>
        <div className='card'>

          {Components[display]}
        </div>
      </div>
      <div className='footer'>Footer </div>
    </>
  )
}

export default App

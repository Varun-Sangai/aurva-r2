import './App.css'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className='w-full overflow-y-auto'>
      <Dashboard input={[[1,1,1],[1,0,0],[1,1,1]]}></Dashboard>
    </div>
  )
}

export default App

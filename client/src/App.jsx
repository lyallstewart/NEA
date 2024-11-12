import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'


const App = () => {
  return (
    <>
        <Sidebar />
        <main>
          <Outlet />
        </main>
    </>
  )
}

export default App;

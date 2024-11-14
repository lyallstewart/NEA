import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'

import "./assets/css/buttons.css";
import "./assets/css/forms.css";

const App = () => {
  return (
    <>
        <Sidebar />
        <main>
          { /* Actual site content is rendered into the Outlet by Router */ }
          <Outlet />
        </main>
    </>
  )
}

export default App;

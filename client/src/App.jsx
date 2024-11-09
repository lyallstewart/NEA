import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'


function App() {
  return (
    <>
      <div class="w-full flex h-svh max-h-svh">
        <div class="h-full flex-[0.3]">
            <Sidebar />
        </div>

        <div class="h-full flex-1">
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default App

import React from 'react'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import UserList from './components/UserList'

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar />
      <div className="flex-1 flex">
        <Canvas />
        <UserList />
      </div>
    </div>
  )
}

export default App

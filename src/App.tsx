import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import UserList from './components/UserList'

type DrawingTool = 'select' | 'rectangle' | 'circle' | 'text'

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<DrawingTool>('select')

  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar currentTool={currentTool} onToolChange={setCurrentTool} />
      <div className="flex-1 flex">
        <Canvas currentTool={currentTool} onToolChange={setCurrentTool} />
        <UserList />
      </div>
    </div>
  )
}

export default App

import React from 'react'
import { Square, Circle, Type, MousePointer, Download, Users, Video } from 'lucide-react'

type DrawingTool = 'select' | 'rectangle' | 'circle' | 'text'

interface ToolbarProps {
  currentTool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ currentTool, onToolChange }) => {
  const tools = [
    { icon: MousePointer, label: 'Select', tool: 'select' as DrawingTool },
    { icon: Square, label: 'Rectangle', tool: 'rectangle' as DrawingTool },
    { icon: Circle, label: 'Circle', tool: 'circle' as DrawingTool },
    { icon: Type, label: 'Text', tool: 'text' as DrawingTool },
  ]

  const actions = [
    { icon: Download, label: 'Export' },
    { icon: Users, label: 'Users' },
    { icon: Video, label: 'Video Chat' },
  ]

  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-2">
      <div className="space-y-1">
        {tools.map((tool) => (
          <button
            key={tool.label}
            className={`p-3 rounded-lg transition-colors ${
              currentTool === tool.tool
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title={tool.label}
            onClick={() => onToolChange(tool.tool)}
          >
            <tool.icon size={20} />
          </button>
        ))}
      </div>
      
      <div className="border-t border-gray-700 pt-2 space-y-1">
        {actions.map((action) => (
          <button
            key={action.label}
            className="p-3 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors"
            title={action.label}
          >
            <action.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Toolbar

import React from 'react'
import { User, Video, VideoOff, Users } from 'lucide-react'

const UserList: React.FC = () => {
  const users = [
    { id: '1', name: 'You', color: '#3B82F6', isVideoOn: true, isCurrentUser: true },
    { id: '2', name: 'Alice', color: '#10B981', isVideoOn: false, isCurrentUser: false },
    { id: '3', name: 'Bob', color: '#F59E0B', isVideoOn: true, isCurrentUser: false },
  ]

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
        <Users size={18} className="mr-2" />
        Active Users ({users.length})
      </h3>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: user.color }}
              >
                {user.name[0]}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {user.name}
                  {user.isCurrentUser && ' (You)'}
                </p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              {user.isVideoOn ? (
                <Video size={16} className="text-green-600" />
              ) : (
                <VideoOff size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Video size={16} className="mr-2" />
          Start Video Call
        </button>
      </div>
    </div>
  )
}

export default UserList

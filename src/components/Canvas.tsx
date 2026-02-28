import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

type DrawingTool = 'select' | 'rectangle' | 'circle' | 'text'

interface CanvasProps {
  currentTool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
}

const Canvas: React.FC<CanvasProps> = ({ currentTool }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth - 200,
        height: window.innerHeight - 60,
        backgroundColor: 'white'
      })

      // Handle window resize
      const handleResize = () => {
        fabricCanvasRef.current?.setDimensions({
          width: window.innerWidth - 200,
          height: window.innerHeight - 60
        })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        fabricCanvasRef.current?.dispose()
      }
    }
  }, [])

  // Set up drawing modes
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    // Clear existing event listeners
    fabricCanvasRef.current.off('mouse:down')
    fabricCanvasRef.current.off('mouse:move')
    fabricCanvasRef.current.off('mouse:up')

    fabricCanvasRef.current.on('mouse:down', (options) => {
        if (currentTool === 'select') return
        
        const pointer = fabricCanvasRef.current?.getPointer(options.e)
        if (!pointer) return

        if (currentTool === 'rectangle') {
          const rect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: '#3B82F6',
            strokeWidth: 2,
            stroke: '#1E40AF'
          })
          fabricCanvasRef.current?.add(rect)
          fabricCanvasRef.current?.setActiveObject(rect)
        } else if (currentTool === 'circle') {
          const circle = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 1,
            fill: '#10B981',
            strokeWidth: 2,
            stroke: '#059669'
          })
          fabricCanvasRef.current?.add(circle)
          fabricCanvasRef.current?.setActiveObject(circle)
        } else if (currentTool === 'text') {
          const text = new fabric.IText('Click to edit', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: '#1F2937'
          })
          fabricCanvasRef.current?.add(text)
          fabricCanvasRef.current?.setActiveObject(text)
        }
      })

      fabricCanvasRef.current.on('mouse:move', (options) => {
        if (currentTool === 'select') return
        
        const activeObject = fabricCanvasRef.current?.getActiveObject()
        if (!activeObject) return

        const pointer = fabricCanvasRef.current?.getPointer(options.e)
        if (!pointer) return

        if (currentTool === 'rectangle' && activeObject.type === 'rect') {
          const rect = activeObject as fabric.Rect
          rect.set({
            width: Math.abs(pointer.x - rect.left!),
            height: Math.abs(pointer.y - rect.top!)
          })
        } else if (currentTool === 'circle' && activeObject.type === 'circle') {
          const circle = activeObject as fabric.Circle
          const radius = Math.sqrt(
            Math.pow(pointer.x - circle.left!, 2) + Math.pow(pointer.y - circle.top!, 2)
          )
          circle.set({ radius })
        }
        
        fabricCanvasRef.current?.renderAll()
      })

      fabricCanvasRef.current.on('mouse:up', () => {
        if (currentTool !== 'select') {
          fabricCanvasRef.current?.discardActiveObject()
        }
      })
  }, [currentTool])

  return (
    <div className="flex-1 bg-white shadow-lg">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas

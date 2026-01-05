import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth - 200,
        height: window.innerHeight - 60,
        backgroundColor: 'white'
      })

      // Add basic shapes for testing
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: '#3B82F6',
        strokeWidth: 2,
        stroke: '#1E40AF'
      })

      const circle = new fabric.Circle({
        left: 250,
        top: 100,
        radius: 50,
        fill: '#10B981',
        strokeWidth: 2,
        stroke: '#059669'
      })

      fabricCanvasRef.current.add(rect, circle)
      fabricCanvasRef.current.renderAll()

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

  return (
    <div className="flex-1 bg-white shadow-lg">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas

"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LoadingSpinner from "@/components/loading-spinner"

interface ImageDisplayProps {
  imageUrl: string | null
  isLoading: boolean
  error: string | null
}

export default function ImageDisplay({ imageUrl, isLoading, error }: ImageDisplayProps) {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (imageUrl) {
      setFadeIn(true)
    } else {
      setFadeIn(false)
    }
  }, [imageUrl])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Создание вашего шедевра...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!imageUrl) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-gray-500 dark:text-gray-400 text-center">Ваше сгенерированное изображение появится здесь</p>
      </div>
    )
  }

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Сгенерированное изображение</h2>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Generated image"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Изображение успешно сгенерировано</p>
          <Button variant="outline" size="sm" onClick={() => window.open(imageUrl, "_blank")}>
            View Full Size
          </Button>
        </div>
      </div>
    </div>
  )
}

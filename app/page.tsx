"use client"

import { useState } from "react"
import ImageDisplay from "@/components/image-display"
import GenerationForm from "@/components/generation-form"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateImage = async (prompt: string, style: string) => {
    setLoading(true)
    setError(null)

    setTimeout(() => {
      const seed = (prompt.length + style.length) % 100
      setImage(`https://picsum.photos/seed/${seed}/512`)
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">ImageGen AI</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Превращайте свои идеи в потрясающие визуальные эффекты с помощью нашего инструмента генерации изображений на базе ИИ. Просто опишите, что вы
              хотите увидеть, выберите стиль и позвольте нашему ИИ творить волшебство.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <GenerationForm onGenerate={generateImage} isLoading={loading} />
        </div>

        <ImageDisplay imageUrl={image} isLoading={loading} error={error} />
      </div>
    </main>
  )
}

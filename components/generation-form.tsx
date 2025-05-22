"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2 } from "lucide-react"

interface GenerationFormProps {
  onGenerate: (prompt: string, style: string) => void
  isLoading: boolean
}

export default function GenerationForm({ onGenerate, isLoading }: GenerationFormProps) {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("photorealistic")

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt, style)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Опишите своё изображение
        </label>
        <Textarea
          id="prompt"
          placeholder="Футуристический город на закате с летающими автомобилями и неоновыми огнями..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px]"
          disabled={isLoading}
          aria-label="Image description"
        />
      </div>

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Выберите стиль
        </label>
        <Select value={style} onValueChange={setStyle} disabled={isLoading}>
          <SelectTrigger id="style" className="w-full">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="photorealistic">Photorealistic</SelectItem>
            <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!prompt.trim() || isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        size="lg"
      >
        <Wand2 className="mr-2 h-4 w-4" />
        {isLoading ? "Генерация..." : "Генерация изображения"}
      </Button>
    </div>
  )
}

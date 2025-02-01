"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { askClaude } from "../actions/claude"

export default function InteractivePane() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await askClaude(prompt)
      setResponse(result)
    } catch (error) {
      console.error("Error:", error)
      setResponse("An error occurred while processing your request.")
    }
    setIsLoading(false)
  }

  return (
    <div className="h-screen bg-white p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Interactive Learning</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Claude a question..."
          className="w-full"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Ask Claude"}
        </Button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Claude's Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}


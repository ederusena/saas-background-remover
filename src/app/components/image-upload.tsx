'use client'

import { useState, useRef } from 'react'
import { Button } from '@/app/components/ui/button'
import { useMutation } from '@tanstack/react-query'

export function ImageUpload() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Falha no processamento')
      return await response.json()
    },
    onSuccess: (data) => {
      setProcessedImage(data.resultUrl)
    },
    onError: (error) => {
      console.error('Erro:', error)
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalImage(URL.createObjectURL(file))
      setProcessedImage(null)
    }
  }

  const handleProcess = () => {
    if (!fileInputRef.current?.files?.[0]) return
    
    setIsProcessing(true)
    mutation.mutate(fileInputRef.current.files[0], {
      onSettled: () => setIsProcessing(false)
    })
  }

  return (
    <div className="border border-dashed rounded-lg p-8 text-center">
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
        id="upload-input"
      />
      
      {!originalImage ? (
        <label 
          htmlFor="upload-input" 
          className="flex flex-col items-center justify-center space-y-4 cursor-pointer py-12"
        >
          <UploadIcon className="h-16 w-16 text-gray-400" />
          <p className="text-lg">Arraste sua imagem aqui</p>
          <p className="text-gray-500">Ou clique para selecionar</p>
          <Button variant="outline">Selecionar Imagem</Button>
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">Original</h3>
              <img 
                src={originalImage} 
                alt="Original" 
                className="max-w-full max-h-96 object-contain mx-auto"
              />
            </div>
            
            {processedImage && (
              <div>
                <h3 className="font-medium mb-2">Resultado</h3>
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="max-w-full max-h-96 object-contain mx-auto"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              Trocar Imagem
            </Button>
            
            <Button 
              onClick={handleProcess} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processando...' : 'Remover Fundo'}
            </Button>
            
            {processedImage && (
              <Button asChild>
                <a href={processedImage} download="imagem-sem-fundo.png">
                  Download
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
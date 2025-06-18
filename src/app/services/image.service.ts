// Implementação usando Remove.bg (API paga)
export async function removeBackground(file: File) {
  const formData = new FormData()
  formData.append('image_file', file)
  
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.REMOVE_BG_API_KEY!,
    },
    body: formData
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Remove.bg error: ${error}`)
  }
  
  return await response.blob()
}

// Implementação alternativa usando rembg (Python) via API
export async function removeBackgroundAlternative(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch(process.env.BG_REMOVAL_API_URL!, {
    method: 'POST',
    body: formData
  })
  
  if (!response.ok) {
    throw new Error('Background removal failed')
  }
  
  return await response.blob()
}
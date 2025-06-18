import { ImageUpload } from '@/app/components/image-upload'
// import { validateRequest } from '@/lib/utils'

export default async function UploadPage() {
  // const { user } = await validateRequest()
  // if (!user) redirect('/login')

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Remover Fundo</h1>
      <ImageUpload />
    </div>
  )
}
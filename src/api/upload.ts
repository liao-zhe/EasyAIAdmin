import { uploadRequest } from './index'

const baseUrl = '/files'

const uploadApi = {
  // 上传文件
  uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return uploadRequest.post<{ url: string }>(baseUrl, formData)
  },

  // 上传多个文件
  uploadMultipleFiles(files: File[]) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    return uploadRequest.post<{ urls: string[] }>(
      `${baseUrl}/multiple`,
      formData
    )
  }
}

export default uploadApi

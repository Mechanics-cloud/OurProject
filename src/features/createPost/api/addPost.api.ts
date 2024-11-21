import { instance } from '@/common/api'
import { AddPostEndpoints } from '@/features/createPost'
import { UploadPhotoResponse } from '@/features/createPost/api/addPost.types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AddPostApi {
  constructor(private instance: AxiosInstance) {}

  public uploadPhotos(
    files: File[]
  ): Promise<AxiosResponse<UploadPhotoResponse>> {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('file', file, file.name || 'Post photo')
    })

    return this.instance.post(AddPostEndpoints.uploadPhotos, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
export const addPostApi = new AddPostApi(instance)

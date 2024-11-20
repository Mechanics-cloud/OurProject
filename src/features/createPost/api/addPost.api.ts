import { instance } from '@/features/auth'
import { AddPostEndpoints } from '@/features/createPost'
import { AxiosInstance } from 'axios'

class AddPostApi {
  constructor(private instance: AxiosInstance) {}

  public uploadPhotos(files: File[]) {
    const formData = new FormData()

    return this.instance.post(AddPostEndpoints.uploadPhotos, formData)
  }
}
export const addPostApi = new AddPostApi(instance)

import { instance } from '@/common/api'
import { AddPostEndpoints } from '@/features/createPost'
import {
  UploadPhotoResponse,
  UploadPost,
  UploadPostResponse,
} from '@/features/createPost/api/addPost.types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AddPostApi {
  constructor(private instance: AxiosInstance) {}

  public uploadPhotos(
    formData: FormData
  ): Promise<AxiosResponse<UploadPhotoResponse>> {
    return this.instance.post(AddPostEndpoints.uploadPhotos, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  public uploadPostDescription(
    uploadData: UploadPost
  ): Promise<AxiosResponse<UploadPostResponse>> {
    return this.instance.post(AddPostEndpoints.uploadPost, uploadData)
  }
}

export const addPostApi = new AddPostApi(instance)

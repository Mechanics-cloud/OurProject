import { instance } from '@/common/api'
import { AddPostEndpoints } from '@/features/createPost'
import {
  UploadImagesResponse,
  UploadPost,
  UploadPostResponse,
} from '@/features/createPost/api/addPost.types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AddPostApi {
  constructor(private instance: AxiosInstance) {}

  public uploadImages(
    formData: FormData
  ): Promise<AxiosResponse<UploadImagesResponse>> {
    return this.instance.post(AddPostEndpoints.uploadImages, formData, {
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

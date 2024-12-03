export type RequestQueries = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type PublicPostsDto = {
  items: PostDto[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type PostDto = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: PostImageDto[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: PostImageOwnerDto
  ownerId: number
  updatedAt: string
  userName: string
}

export type PostImageDto = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostImageOwnerDto = {
  firstName: string
  lastName: string
}

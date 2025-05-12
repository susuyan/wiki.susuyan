export interface Author {
  name: string
  username: string
  avatar: string
}

export interface Post {
  id: string
  author: Author
  content: string
  images?: string[]
  timestamp: string
}

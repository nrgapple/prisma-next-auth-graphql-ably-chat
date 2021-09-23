import { User } from '.prisma/client'

export interface Chat {
  id: number
  createdAt: Date
  messages?: Message[]
}

export interface Message {
  id: number
  createdAt: Date
  sender: User
  message: string
}

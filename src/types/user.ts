import { loadUser } from 'pages/app.slice'
import { store } from 'state/store'

export interface PublicUser {
  name: string
  image?: string | null
}

export interface User extends PublicUser {
  email: string
  profile?: Profile
}

export interface Profile {
  chats?: Chat[]
}

export interface Chat {
  id: number
  messages?: Message[]
}

export interface Message {
  id: number
  message: string
  sender: PublicUser
}

export function loadUserIntoApp(user: User) {
  store.dispatch(loadUser(user))
}

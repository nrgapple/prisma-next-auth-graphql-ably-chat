import { loadUser } from 'pages/app.slice'
import { store } from 'state/store'
import { Chat } from './chat'

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

export function loadUserIntoApp(user: User) {
  store.dispatch(loadUser(user))
}

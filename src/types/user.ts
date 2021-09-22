import { loadUser } from 'pages/app.slice'
import { store } from 'state/store'

export interface PublicUser {
  name: string
  image?: string | null
}

export interface User extends PublicUser {
  email: string
}

export function loadUserIntoApp(user: User) {
  store.dispatch(loadUser(user))
}

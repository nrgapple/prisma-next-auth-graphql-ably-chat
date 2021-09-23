import { Action, configureStore } from '@reduxjs/toolkit'
import app from '../pages/app.slice'
import chatBox from '../components/ChatBox/chatBox.slice'
import chat from '../pages/chat/chat.slice'
const middlewareConfiguration = { serializableCheck: false }

export const store = configureStore({
  reducer: { app, chatBox, chat },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfiguration),
})
export type State = ReturnType<typeof store.getState>

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action)
}

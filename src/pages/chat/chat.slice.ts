import { None, Option, Some } from '@hqoss/monads'
import { Chat } from 'types/chat'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatsState {
  loading: boolean
  chats: Option<Chat[]>
}

const initialState: ChatsState = {
  loading: true,
  chats: None,
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    loadChats: (state, { payload: chats }: PayloadAction<Chat[]>) => {
      state.chats = Some(chats)
      state.loading = false
    },
    addChat: (state, { payload: chat }: PayloadAction<Chat>) => {
      state.chats = Some(
        state.chats.match({
          none: () => [chat],
          some: (chats) => [chat, ...chats],
        }),
      )
    },
    removeChat: (state, { payload: chat }: PayloadAction<Chat>) => {
      state.chats = Some(
        state.chats.match({
          none: () => [],
          some: (chats) => chats.filter((x) => x.id !== chat.id),
        }),
      )
    },
  },
})

export const { loadChats, addChat, removeChat } = slice.actions

export default slice.reducer

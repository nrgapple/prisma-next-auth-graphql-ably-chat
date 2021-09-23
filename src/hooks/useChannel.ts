import { useEffect } from 'react'
import Ably from 'ably/promises'
import { Types } from 'ably'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' })

export function useChannel(channelName: string, callbackOnMessage: (msg: Types.Message) => void) {
  const channel = ably.channels.get(channelName)

  const onMount = () => {
    channel.subscribe((msg) => {
      callbackOnMessage(msg)
    })
  }

  const onUnmount = () => {
    channel.unsubscribe()
  }

  const useEffectHook = () => {
    onMount()
    return () => {
      onUnmount()
    }
  }

  useEffect(useEffectHook)

  return [channel, ably] as const
}

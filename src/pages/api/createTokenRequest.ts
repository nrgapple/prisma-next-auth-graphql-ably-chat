import Ably from 'ably/promises'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY)
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' })
  res.status(200).json(tokenRequestData)
}

export default handler

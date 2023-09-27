import { handler } from '../get-clases-data'

export const GET = async () => {
  const res = await handler()
  return new Response(JSON.stringify(res))
}

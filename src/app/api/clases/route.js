import { handlerGetAllClases } from '../get-clases-data'

export const GET = async () => {
  const res = await handlerGetAllClases()
  return new Response(JSON.stringify(res))
}

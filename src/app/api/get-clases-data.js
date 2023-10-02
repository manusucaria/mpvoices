import path from 'path'
import { promises as fs } from 'fs'

export const handler = async () => {
  const jsonDirectory = path.join(process.cwd(), 'src/app/api')
  const fileContents = await fs.readFile(
    jsonDirectory + '/clases/clases.json',
    'utf-8'
  )
  return JSON.parse(fileContents)
}

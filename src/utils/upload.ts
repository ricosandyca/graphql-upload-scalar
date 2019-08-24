import fs from 'fs'

import mimeLibrary from '../config/mime'
import { upload } from '../config/app'

const { dest } = upload

// Return boolean
const validateMime: (mimetype: string, allowedType: Array<string>) => boolean = (mimetype, allowedType) => {
  return allowedType.reduce((state: boolean, currentValue: string) => {
    const mime = mimeLibrary[currentValue] || []
    return mime.includes(mimetype) ? true : state
  }, false)
}

// Return filepath / null
const saveFile: (stream: any, filename: string) => Promise<string | null> = (stream, filename) => {
  filename = `${new Date().toISOString()}_${filename}`
  const savedNewFile = `${dest}/${filename}`
  console.log(savedNewFile)
  return new Promise<string | null>((resolve, reject) => {
    stream
      .on('error', () => reject())
      .pipe(fs.createWriteStream(savedNewFile))
        .on('error', () => reject())
        .on('finish', () => resolve(savedNewFile))
  })
}

const deleteFile: (path: string) => Promise<string | null> = (path) => {
  return new Promise<string | null>((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export { saveFile, validateMime, deleteFile }

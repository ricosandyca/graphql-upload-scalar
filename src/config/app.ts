interface IUpload {
  dest: string
  maxFieldSize: number,
  maxFileSize: number,
  maxFiles?: number
}

interface IApp {
  name: string
  port: number | string
}

const app: IApp = {
  name: 'GraphQL Upload Scalar',
  port: 4000
}

/**
  * 1kb = 1024
  * 1mb = 1024 * 1024
  * 1gb = 1024 * 1024 * 1024
  */

const upload: IUpload = {
  dest: 'uploads',
  maxFieldSize: 1000000, // max operation size
  maxFileSize: 1024 * 1024 * 5, // max file upload size // 5mb
  maxFiles: 1 // max allowed number of files
}

export { app, upload }

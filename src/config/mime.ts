interface IMime {
  [name: string]: Array<string>
}

const Mime: IMime = {
  pdf: ['application/pdf'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg']
}

export default Mime

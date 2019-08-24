import { ITypeDefinitions } from 'apollo-server-express'
import { importSchema } from 'graphql-import'
import path from 'path'

const typeDefs: ITypeDefinitions = importSchema(
  path.join(__dirname, '../../graphql/Schema.graphql')
)

export default typeDefs

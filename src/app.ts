import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import * as config from './config/app'

const app: any = express()
const PORT: string | number = process.env.PORT || config.app.port
let { dest: _dest, ...uploads } = config.upload

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const GraphQLServer = new ApolloServer({ schema, uploads })
GraphQLServer.applyMiddleware({ app, path: '/graphql' })

app.listen(PORT, () => console.log('Server running on port', PORT))

import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'

const app: any = express()
const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const GraphQLServer = new ApolloServer({ schema })
GraphQLServer.applyMiddleware({ app, path: '/graphql' })

app.listen(PORT, () => console.log('Server running on port', PORT))

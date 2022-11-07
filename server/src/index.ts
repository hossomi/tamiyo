import express from 'express'
import { GREETING } from '@tamiyo/shared'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

const resolvers = {
    hello: () => GREETING
}

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8000, () => console.log('Listening'))
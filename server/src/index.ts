import express from 'express'
import { GREETING } from '@tamiyo/shared'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import fs from 'fs'
import path from 'path'
import { getSet, getSets } from './dao'

const schema = buildSchema(fs.readFileSync(path.join(__dirname, '../../shared/graphql/api.gql')).toString())

const resolvers = {
    sets: () => getSets().map(set => set.code),
    set: ({ code }: { code: string }) => {
        const set = getSet(code)
        if (!set) {
            throw new Error(`Unknown set: ${code}`)
        }
        return {
            code: set.code,
            name: set.name,
            releaseDate: set.releaseDate
        }
    }
}

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8000, () => console.log('Listening'))
import { afterAll, beforeAll, expect } from '@jest/globals'

import { database, model, server } from './server-helper'

import { createApolloFetch } from 'apollo-fetch'

let fetch
beforeAll(async () => {
  jest.setTimeout(30000)
  await model
  fetch = await createApolloFetch({ uri: `http://${process.env.HOST}:${process.env.PORT}/graphql` })
  await server.listen({ port: process.env.PORT })
})

afterAll(async () => {
  await (await database).close()
  await server.stop()
})

test('Gets all Athletes list grouped by Game', async () =>
  expect(
    await fetch({
      query: `query {
      getAthletesByGame {
        game {
          id
          city
          year
        }
        athletes {
          id
          name
          surname
        }
      }
    }`,
      variables: {}
    })
  ).toMatchSnapshot())

test('Gets specific Athlete by ID', async () =>
  expect(
    await fetch({
      query: `query {
      getAthlete(id: "1") {
        id
        name
        surname
        bio
        dateOfBirth
        weight
        height
        photo {
          id
          photo
          mimeType
        }
        athleteResults {
          id
          gold
          silver
          bronze
          game {
            id
            city
            year
          }
        }
      }
    }`,
      variables: { id: '1' }
    })
  ).toMatchSnapshot())

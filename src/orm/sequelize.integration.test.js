import { expect } from '@jest/globals'

import 'dotenv/config'

import { initSequelize, closeSequelize } from './sequelize'

test('ORM must be properly initialized', async () => {
  const model = initSequelize()

  const athletePhotos = await (await model).AthletePhoto.findAndCountAll()
  const athletes = await (await model).Athlete.findAndCountAll()
  const games = await (await model).Game.findAndCountAll()
  const athleteResults = await (await model).AthleteResult.findAndCountAll()

  expect(athletePhotos.count).toEqual(18)
  expect(athletes.count).toEqual(18)
  expect(games.count).toEqual(16)
  expect(athleteResults.count).toEqual(41)

  await closeSequelize()
})

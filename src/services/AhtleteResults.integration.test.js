import { afterAll, beforeEach, expect } from '@jest/globals'

import 'dotenv/config'

import { initSequelize, closeSequelize } from '../orm/sequelize'

import { getAthleteResultsByGameId } from './AthleteResults'

let model
beforeEach(async () => (model = initSequelize()))

afterAll(async () => closeSequelize)

test('Gets AthleteResults by Game ID', async () => {
  const athleteResults = await getAthleteResultsByGameId(await model, 2)
  expect(athleteResults[0].athlete_id).toBe('2')
  expect(athleteResults[1].athlete_id).toBe('3')
  expect(athleteResults[2].athlete_id).toBe('4')
  expect(athleteResults[3].athlete_id).toBe('5')
  expect(athleteResults[4].athlete_id).toBe('17')
})

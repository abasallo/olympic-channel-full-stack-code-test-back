import { afterAll, beforeEach, expect } from '@jest/globals'

import 'dotenv/config'

import { initSequelize, closeSequelize } from '../orm/sequelize'

import { getMappedAthlete } from './Athlete'

let model
beforeEach(async () => (model = initSequelize()))

afterAll(async () => closeSequelize)

test('Gets mapped athlete by ID', async () => {
  const athlete = await getMappedAthlete(await model, 2)
  expect(athlete.name).toBe('Lidia')
  expect(athlete.surname).toBe('Valentin Perez')
  expect(athlete.bio).toBeTruthy()
  expect(athlete.photo).toBeTruthy()
  expect(athlete.athleteResults.length).toBe(3)
})

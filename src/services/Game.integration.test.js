import { afterAll, beforeEach, expect } from '@jest/globals'

import 'dotenv/config'

import { initSequelize, closeSequelize } from '../orm/sequelize'

import { getAllGames } from './Game'

let model
beforeEach(async () => (model = initSequelize()))

afterAll(async () => closeSequelize)

test('Gets all games', async () => {
  const games = await getAllGames(await model)
  expect(games.length).toBe(16)
})

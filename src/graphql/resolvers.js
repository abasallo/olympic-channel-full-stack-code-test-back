import { getAllGames, getAthleteResultsByGameId, getMappedAthlete } from './resolver-helper'

export default {
  Query: {
    getAthletesByGame: async (parent, args, { model }) => {
      const resolvedModel = await model
      const games = await getAllGames(resolvedModel)
      const result = []
      for (const game of games) {
        const athletesPerGame = await getAthleteResultsByGameId(resolvedModel, game.game_id)
        const mappedAthletesPerGame = []
        athletesPerGame.forEach((athlete) => {
          mappedAthletesPerGame.push(getMappedAthlete(resolvedModel, athlete.athlete_id))
        })
        result.push({
          game: { id: game.game_id, city: game.city, year: game.year },
          athletes: mappedAthletesPerGame
        })
      }
      return result.sort((a, b) => (a.game.year < b.game.year ? 1 : b.game.year < a.game.year ? -1 : 0))
    },
    getAthlete: async (parent, { id }, { model }) => getMappedAthlete(await model, id)
  }
}

import { Base64 } from 'js-base64'

const getAthleteById = async (resolvedModel, id) => await resolvedModel.Athlete.findOne({ where: { athlete_id: id } })

const getPhotoById = async (resolvedModel, id) => await resolvedModel.AthletePhoto.findOne({ where: { photo_id: id } })

const getAllGames = async (resolvedModel) => await resolvedModel.Game.findAll()

const getGameById = async (resolvedModel, id) => await resolvedModel.Game.findOne({ where: { game_id: id } })

const getAthleteResultsById = async (resolvedModel, id) => await resolvedModel.AthleteResult.findAll({ where: { athlete_id: id } })

const getAthleteResultsByGameId = async (resolvedModel, gameId) => await resolvedModel.AthleteResult.findAll({ where: { game_id: gameId } })

const getMappedAthleteResults = async (resolvedModel, athleteResults) => {
  const mappedAthleteResults = []
  for (const athleteResult of athleteResults) {
    const game = await getGameById(resolvedModel, athleteResult.game_id)
    mappedAthleteResults.push({
      id: athleteResult.athlete_id + '-' + athleteResult.game_id,
      gold: athleteResult.gold,
      silver: athleteResult.silver,
      bronze: athleteResult.bronze,
      game: { id: game.game_id, city: game.city, year: game.year }
    })
  }
  return mappedAthleteResults
}

const getMappedAthlete = async (resolvedModel, id) => {
  const athlete = await getAthleteById(resolvedModel, id)
  const photo = await getPhotoById(resolvedModel, athlete.photo_id)
  const athleteResults = await getAthleteResultsById(resolvedModel, athlete.athlete_id)

  const mappedAthleteResults = await getMappedAthleteResults(resolvedModel, athleteResults)
  return {
    id: athlete.athlete_id,
    name: athlete.name,
    surname: athlete.surname,
    bio: athlete.bio,
    dateOfBirth: athlete.date_of_birth,
    weight: athlete.weight,
    height: athlete.height,
    photo: {
      id: photo.photo_id,
      photo: Base64.encode(photo.photo),
      mimeType: photo.mime_type
    },
    athleteResults: mappedAthleteResults.sort((a, b) => (a.game.year < b.game.year ? 1 : b.game.year < a.game.year ? -1 : 0))
  }
}

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

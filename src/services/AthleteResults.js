export const getAthleteResultsByGameId = async (resolvedModel, gameId) =>
  await resolvedModel.AthleteResult.findAll({ where: { game_id: gameId } })

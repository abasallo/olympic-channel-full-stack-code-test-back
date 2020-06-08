import Sequelize from 'sequelize'

import constants from '../modules/constants'

const AthletePhoto = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE_PHOTO,
    {
      photo_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
      photo: { type: Sequelize.BLOB },
      mime_type: { type: Sequelize.STRING }
    },
    { tableName: constants.ENTITY_ATHLETE_PHOTO, timestamps: false }
  )

const Athlete = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE,
    {
      athlete_id: { type: Sequelize.TEXT, allowNull: false, primaryKey: true },
      name: { type: Sequelize.TEXT },
      surname: { type: Sequelize.TEXT },
      bio: { type: Sequelize.TEXT },
      date_of_birth: { type: Sequelize.DATEONLY },
      weight: { type: Sequelize.INTEGER },
      height: { type: Sequelize.INTEGER },
      photo_id: { type: Sequelize.INTEGER, references: { model: 'AthletePhoto', key: 'photo_id' } }
    },
    { tableName: constants.ENTITY_ATHLETE, timestamps: false }
  )

const Game = (sequelize) =>
  sequelize.define(
    constants.ENTITY_GAME,
    {
      game_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
      city: { type: Sequelize.TEXT },
      year: { type: Sequelize.INTEGER }
    },
    { tableName: constants.ENTITY_GAME, timestamps: false }
  )

const AthleteResult = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE_RESULT,
    {
      athlete_id: { type: Sequelize.TEXT, primaryKey: true, allowNull: false, references: { model: 'Athlete', key: 'athlete_id' } },
      game_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, references: { model: 'Game', key: 'game_id' } },
      gold: { type: Sequelize.INTEGER, defaultValue: '0' },
      silver: { type: Sequelize.INTEGER, defaultValue: '0' },
      bronze: { type: Sequelize.INTEGER, defaultValue: '0' }
    },
    { tableName: constants.ENTITY_ATHLETE_RESULT, timestamps: false }
  )

export const initializeModel = (sequelize) => ({
  Athlete: Athlete(sequelize),
  AthletePhoto: AthletePhoto(sequelize),
  Game: Game(sequelize),
  AthleteResult: AthleteResult(sequelize)
})

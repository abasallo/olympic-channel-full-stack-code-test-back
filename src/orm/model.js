import Sequelize from 'sequelize'

import constants from '../modules/constants'

const AthletePhoto = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE_PHOTO,
    {
      photo_id: { type: Sequelize.INTEGER, allowNull: true, primaryKey: true },
      photo: { type: Sequelize.BLOB, allowNull: false },
      mime_type: { type: Sequelize.STRING, allowNull: false }
    },
    { tableName: constants.ENTITY_ATHLETE_PHOTO, timestamps: false }
  )

const Athlete = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE,
    {
      athlete_id: { type: Sequelize.TEXT, allowNull: false, primaryKey: true },
      name: { type: Sequelize.TEXT, allowNull: false },
      surname: { type: Sequelize.TEXT, allowNull: false },
      bio: { type: Sequelize.TEXT, allowNull: true },
      date_of_birth: { type: Sequelize.DATEONLY, allowNull: true },
      weight: { type: Sequelize.INTEGER, allowNull: true },
      height: { type: Sequelize.INTEGER, allowNull: true },
      photo_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'AthletePhoto', key: 'photo_id' } }
    },
    { tableName: constants.ENTITY_ATHLETE, timestamps: false }
  )

const Game = (sequelize) =>
  sequelize.define(
    constants.ENTITY_GAME,
    {
      game_id: { type: Sequelize.INTEGER, allowNull: true, primaryKey: true },
      city: { type: Sequelize.TEXT, allowNull: false },
      year: { type: Sequelize.INTEGER(4), allowNull: false }
    },
    { tableName: constants.ENTITY_GAME, timestamps: false }
  )

const AthleteResult = (sequelize) =>
  sequelize.define(
    constants.ENTITY_ATHLETE_RESULT,
    {
      athlete_id: { type: Sequelize.TEXT, primaryKey: true, allowNull: true, references: { model: 'Athlete', key: 'athlete_id' } },
      game_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: true, references: { model: 'Game', key: 'game_id' } },
      gold: { type: Sequelize.INTEGER, allowNull: false, defaultValue: '0' },
      silver: { type: Sequelize.INTEGER, allowNull: false, defaultValue: '0' },
      bronze: { type: Sequelize.INTEGER, allowNull: false, defaultValue: '0' }
    },
    { tableName: constants.ENTITY_ATHLETE_RESULT, timestamps: false }
  )

export const initializeModel = (sequelize) => ({
  Athlete: Athlete(sequelize),
  AthletePhoto: AthletePhoto(sequelize),
  Game: Game(sequelize),
  AthleteResult: AthleteResult(sequelize)
})

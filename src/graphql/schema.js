import { gql } from 'apollo-server'

export default gql`
  schema {
    query: Query
  }

  type Query {
    getAthletesByGame: [AthletesByGame]
    getAthlete(id: String): Athlete
  }

  type AthletesByGame {
    game: Game
    athletes: [Athlete]
  }

  type Athlete {
    id: ID!
    name: String
    surname: String
    bio: String
    dateOfBirth: String
    weight: Int
    height: Int
    photo: AthletePhoto
    athleteResults: [AthleteResult]
  }

  type AthletePhoto {
    id: ID!
    photo: String
    mimeType: String
  }

  type AthleteResult {
    id: ID!
    gold: Int
    silver: Int
    bronze: Int
    game: Game
  }

  type Game {
    id: ID!
    city: String
    year: Int
  }
`

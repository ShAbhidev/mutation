export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!
  }

  type Query {
    reviews: [Review!]!
    review(id: ID!): Review
    authors: [Author!]!
    author(id: ID!): Author
    games: [Game!]!
    game(id: ID!): Game
  }

  type Mutation {
    addData(author:addAuthInput!):Author
    deleteData(id:ID!):[Review]
    updateData (id:ID!,edit:editInput!):Game
  }
  input addAuthInput{
    name:String!,
    verified:Boolean!,
  }
  input editInput{
    title:String!,
    platform:[String!]
  }
`;
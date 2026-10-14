import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, { id }) {
      return db.games.find((game) => game.id === id);
    },
    authors() {
      return db.authors;
    },
    author(_, { id }) {
      return db.authors.find((author) => author.id === id);
    },
    reviews() {
      // console.log(db.reviews)
      return db.reviews;
    },
    review(_, { id }) {
      return db.reviews.find((review) => review.id === id);
    }
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    }
  },
  Mutation: {
    addData(_, args) {
      let author = {
        ...args.author,
        id: Math.floor(Math.random() * 100).toString()
      }
      let check = db.authors.push(author)
      console.log(check)
      // console.log(author)
      return author
    },

    deleteData(_, args) {
      db.reviews = db.reviews.filter((d) => d.id !== args.id)
      console.log(db.reviews)
      return db.reviews
    },
    updateData(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edit }
        }
        return g
      }
      )
      const updatedValue = db.games.find((g) => g.id === args.id)
      console.log(updatedValue)
      return updatedValue
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀 Server ready at: ${url}`);

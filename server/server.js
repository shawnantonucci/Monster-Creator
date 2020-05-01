const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

const monsters = [
  {
    id: "monster-0",
    name: "Monster 1",
    health: 50,
    attacks: [
      {
        name: "Attack 1",
        dmg: 5,
      },
    ],
  },
  {
    id: "monster-1",
    name: "Monster 2",
    health: 100,
    attacks: [
      {
        name: "Attack 2",
        dmg: 10,
      },
    ],
  },
  {
    id: "monster-2",
    name: "Monster 3",
    health: 150,
    attacks: [
      {
        name: "Attack 2",
        dmg: 10,
      },
      {
        name: "Attack 3",
        dmg: 20,
      },
    ],
  },
];

const typeDefs = `
  type Query { monsters: [Monster] }

  type Monster { 
    id: ID!
    name: String!,
    health: Int!,
    attacks: [Attacks!]!
  }
  type Attacks {
    name: String!,
    dmg: Int!,
  }

  input attackInput {
    name: String!,
    dmg: Int!
  }

  type Mutation {
    createMonster(name: String!, health: Int!, attacks: [attackInput]!): Monster
  }
`;

let idCount = monsters.length

const resolvers = {
  Query: { monsters: () => monsters },
  Mutation: {
    createMonster: (parent, args) => {
       const newMonster = {
        id: `monster-${idCount++}`,
        name: args.name,
        health: args.health,
        attacks: args.attacks
      }
      monsters.push(newMonster)
      return newMonster
    }
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors());

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(4000, () => {
  console.log("Go to http://localhost:4000/graphiql to run queries!");
});

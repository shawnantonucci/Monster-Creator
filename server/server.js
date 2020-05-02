const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "makethislongandrandom";

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
];

const users = [
  {
    id: "shawn12345",
    name: "shawn",
  },
];

const typeDefs = `
  type Query { 
    monsters: [Monster]
    monster(id: ID!): Monster
    users: [User]
    user(id: ID!): User
    login(username: String): String
  }

  type Monster { 
    id: ID
    name: String
    health: Int
    attacks: [Attacks]
  }
  type User { 
    id: ID
    name: String
  }
  type Attacks {
    name: String
    dmg: Int
  }

  input attackInput {
    name: String
    dmg: Int
  }

  type Mutation {
    createMonster(name: String, health: Int, attacks: [attackInput]): Monster
    signup(id: String, name: String): User
  }
`;

let idCountMonster = monsters.length;

const resolvers = {
  Query: {
    monsters: () => monsters,
    monster: (_, { id }) => monsters.find((monster) => monster.id === id),
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
    login(_, { username }) {
      const user = users.find((user) => user.name === username);
      if (!user) {
        throw Error("username was incorrect");
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      return token;
    },
  },
  Mutation: {
    createMonster: (parent, args) => {
      const newMonster = {
        id: `monster-${idCountMonster++}`,
        name: args.name,
        health: args.health,
        attacks: args.attacks,
      };
      monsters.push(newMonster);
      return newMonster;
    },
    signup(_, { id, name }) {
      const user = { id, name };
      const match = users.find((user) => user.name === name);
      if (match) throw Error("This username already exists");
      users.push(user);
      return user;
    },
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

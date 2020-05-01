const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

const monsters = [
  {
    id: 0,
    name: "Monster 1",
    health: 50,
    attacks: [
      {
        id: 0,
        name: "Attack 1",
        dmg: 5,
      },
    ],
  },
  {
    id: 1,
    name: "Monster 2",
    health: 100,
    attacks: [
      {
        id: 1,
        name: "Attack 2",
        dmg: 10,
      },
    ],
  },
  {
    id: 2,
    name: "Monster 3",
    health: 150,
    attacks: [
      {
        id: 1,
        name: "Attack 2",
        dmg: 10,
      },
      {
        id: 2,
        name: "Attack 3",
        dmg: 20,
      },
    ],
  },
];

const typeDefs = `
  type Query { monsters: [Monster] }
  type Monster { 
    id: Int, 
    name: String,
    health: Int,
    attacks: [Attacks]
  }
  type Attacks {
    id: Int, 
    name: String,
    dmg: Int,
  }
`;

const resolvers = {
  Query: { monsters: () => monsters },
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

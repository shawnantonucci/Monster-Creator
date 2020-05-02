
const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require("graphql-tools");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    username: "shawn",
    password: "$2a$10$XhbJkTKWA67dQyhwvglAOeEfmr5Hl3Z9bZjHGQByShVRm41OL4Ew."
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
    id: ID!
    username: String
    password: String
  }
  type Attacks {
    name: String
    dmg: Int
  }

  input attackInput {
    name: String
    dmg: Int
  }

  type LoginResponse {
    token: String
    user: User
  }

  type LogoutResponse {
    token: String
  }

  type Mutation {
    createMonster(name: String, health: Int, attacks: [attackInput]): Monster
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
  }
`;

let idCountMonster = monsters.length;
let idCountUser = users.length;

const resolvers = {
  Query: {
    monsters: () => monsters,
    monster: (_, { id }) => monsters.find((monster) => monster.id === id),
    users: (parent, args, context) => {
      if (!context.user) throw new Error("Invalid Information")
     
      return users;
     }
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
    register: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: `user-${idCountUser++}`,
        username,
        password: hashedPassword,
      };
      const match = users.find((user) => user.username === username);
      if (match) throw Error("This username already exists");
      users.push(user);
      return user;
    },
    login: async (_, { username, password }) => {
      const user = users.find((user) => user.username === username);

      if (!user) {
        throw new Error("Invalid Login");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid Login");
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        "my-secret-from-env-file-in-prod",
        {
          expiresIn: "30d", // token will expire in 30days
        }
      );
      return {
        token,
        user,
      };
    },
  },
};

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, 'my-secret-from-env-file-in-prod')
    }
    return null
  } catch (err) {
    return null
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const app = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);

    return { user };
  },
 });
 
app.listen(4000, () => {
  console.log("Go to http://localhost:4000/graphiql to run queries!");
});
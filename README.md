# Monster-Creator

1. yarn 
2. yarn start ```to run the front-end```
3. cd server
4. npm install
5. npm start ```To start the server```

http://localhost:4000/graphiql ```For graphql playground```

## Mutations

``` Register ```

mutation {
  register(username: "test", password: "123") {
    username
    password
  }
}

``` Login ```

mutation {
  login(username: "test", password: "123") {
    token
    user {
      id
      username
      password
    }
  }
}

``` View all users ```

{
  users {
    id
    username
    password
  }
}

## Header info

{
  "authorization": "token"
}
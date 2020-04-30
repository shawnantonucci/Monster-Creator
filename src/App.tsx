import React, { useState } from "react";
import "./App.css";

// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import "./App.css";

import { MonsterProvider } from "./context/MonsterProvider";
import CardContainer from "./components/CardContainer/CardContainer";

// const GET_MONSTER_INFO = gql`
//   {
//     monsters {
//       id
//       name
//       health
//       attacks {
//         id
//         name
//         dmg
//       }
//     }
//   }
// `;

function App() {
  // const { data, loading, error } = useQuery(GET_MONSTER_INFO);

  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  // console.log(data, 'data')
  return (
    <MonsterProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <div className="App">
            <CardContainer />
            <button onClick={themeToggler}>Switch Theme</button>
          </div>
        </>
      </ThemeProvider>
    </MonsterProvider>
  );
}

export default App;

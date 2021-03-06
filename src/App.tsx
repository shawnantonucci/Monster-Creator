import React, { useState } from "react";
import "./App.css";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import "./App.css";

import { MonsterProvider } from "./context/MonsterProvider";
import CardContainer from "./components/CardContainer/CardContainer";
import Login from "./views/Login/Login";

function App() {
  const [theme, setTheme] = useState("dark");
  
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <MonsterProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <div className="App">
            <Login />
            <CardContainer />
            <button onClick={themeToggler}>Switch Theme</button>
          </div>
        </>
      </ThemeProvider>
    </MonsterProvider>
  );
}

export default App;

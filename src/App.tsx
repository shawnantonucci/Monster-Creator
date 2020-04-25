import React from "react";
import "./App.css";

import { MonsterProvider } from "./context/MonsterProvider";
import CardContainer from "./components/CardContainer/CardContainer";

function App() {
  return (
    <MonsterProvider>
      <div className="App">
        <CardContainer />
      </div>
    </MonsterProvider>
  );
}

export default App;

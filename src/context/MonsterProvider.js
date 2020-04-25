import React, { createContext, useState } from "react";

export const MonsterContext = createContext();

export const MonsterProvider = (props) => {
  const [monsters, setMonsters] = useState([
    {
      id: 0,
      name: "Sheepie Poo",
      health: 50,
      attacks: [
        {
          id: 0,
          name: "Ram",
          dmg: 5,
        },
        {
          id: 1,
          name: "Backkick",
          dmg: 3,
        },
      ],
    },
    {
      id: 1,
      name: "Birdie",
      health: 50,
      attacks: [
        {
          id: 0,
          name: "Fly",
          dmg: 5,
        },
        {
          id: 1,
          name: "Backflip",
          dmg: 3,
        },
      ],
    },
  ]);

  const providerValue = {
    monsters,
    setMonsters,
  };

  return (
    <MonsterContext.Provider value={providerValue}>
      {props.children}
    </MonsterContext.Provider>
  );
};

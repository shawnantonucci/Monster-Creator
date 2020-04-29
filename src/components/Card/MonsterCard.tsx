import React, { useContext } from "react";
import { MonsterContext } from "../../context/MonsterProvider";
import styles from "./Card.module.css";
import { Card } from "antd";
import { Monster } from "../../types/Monster";
import { Attacks } from "../../types/Attacks";

function MonsterCard() {
  const { monsters, setMonsters } = useContext(MonsterContext);

  const createMonster = (monster: any) => () => {
    console.log(monster);
    setMonsters([...monsters, monster]);
  };

  const testCreateMonster: Monster = {
    id: 3,
    name: "Test Monster",
    health: 50,
    attacks: [
      {
        id: 0,
        name: "Test Attack",
        dmg: 5,
      },
    ],
  };

  return (
    <div>
      {monsters.map((monster: Monster) => {
        console.log(monster);
        return (
          <Card hoverable className={styles.cardContainer}>
            <p>
              #{monster.id} - {monster.name}
            </p>
            <p> HP: {monster.health} </p>
            <div className={styles.attackContainer}>
              <p>Attacks</p>
              {monster.attacks.map((attack: Attacks) => {
                return (
                  <div>
                    <p>
                      ID# {attack.id} - Name: {attack.name} - Damage:{" "}
                      {attack.dmg}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
      <button onClick={createMonster(testCreateMonster)}>Add Monster</button>
    </div>
  );
}

export default MonsterCard;

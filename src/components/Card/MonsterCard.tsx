import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import styles from "./Card.module.css";
import { Card } from "antd";

const GET_MONSTER_INFO = gql`
  {
    monsters {
      id
      name
      health
      attacks {
        name
        dmg
      }
    }
  }
`;

function MonsterCard() {
  const { data, loading, error } = useQuery(GET_MONSTER_INFO);
  const [monsters, setMonsters] = useState();

  useEffect(() => {
    setMonsters(data && Object.values(data.monsters));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {monsters &&
        monsters.map((monster: any) => {
          return (
            <Card key={monster.id} hoverable className={styles.cardContainer}>
              <p>{monster.name}</p>
              <p> HP: {monster.health} </p>
              <div className={styles.attackContainer}>
                <p>Attacks</p>
                {monster.attacks.map((attack: any) => {
                  return (
                    <div key={monster.id}>
                      <p>Name: {attack.name}</p>
                      <p>Damage: {attack.dmg}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
    </>
  );
}

export default MonsterCard;

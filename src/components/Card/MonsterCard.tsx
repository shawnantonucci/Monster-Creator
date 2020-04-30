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
        id
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
    setMonsters(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(monsters, "monsters");

  return (
    <>
      {monsters &&
        Object.keys(monsters).map((key, index) => {
          return (
            <Card
              key={monsters[key][index].id}
              hoverable
              className={styles.cardContainer}
            >
              <p>
                #{monsters[key][index].id} - {monsters[key][index].name}
              </p>
              <p> HP: {monsters[key][index].health} </p>
              <div className={styles.attackContainer}>
                <p>Attacks</p>

                {monsters &&
                  monsters[key][index].attacks.map((attack: any) => {
                    return (
                      <div key={monsters[key][index].id}>
                        <p>Attack ID: {attack.id}</p>
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

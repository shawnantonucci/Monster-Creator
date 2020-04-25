import { Attacks } from "./Attacks";

export type Monster = {
    id: number;
    name: string;
    health: number;
    attacks: Attacks[];
};

import { Person } from "../../entities";

export interface PersonsResult {
    persons: Person[];
    count: number;
}
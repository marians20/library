import { ICrudRepository } from "./i-crud-repository";
import { Person } from "../../models";

export abstract class IPeopleRepository extends ICrudRepository<Person> {
}
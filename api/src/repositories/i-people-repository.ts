import { ICrudRepository } from ".";
import { Person } from "../models";

export abstract class IPeopleRepository extends ICrudRepository<Person> {
    
}
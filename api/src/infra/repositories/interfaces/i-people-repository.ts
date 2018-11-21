import { ICrudRepository } from "./i-crud-repository";
import { Person } from '../../../domain/models';

export abstract class IPeopleRepository extends ICrudRepository<Person> {
}
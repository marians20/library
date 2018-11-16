import { ICrudRepository } from "./i-crud-repository";
import { Producer } from "../../models";

export abstract class IProducersRepository extends ICrudRepository<Producer> {
}
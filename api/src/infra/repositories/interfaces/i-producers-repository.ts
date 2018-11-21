import { ICrudRepository } from "./i-crud-repository";
import { Producer } from '../../../domain/models';

export abstract class IProducersRepository extends ICrudRepository<Producer> {
}
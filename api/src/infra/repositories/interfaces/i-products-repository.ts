import { ICrudRepository } from './i-crud-repository';
import { Product } from '../../../domain/models';

export abstract class IProductsRepository extends ICrudRepository<Product> {
}
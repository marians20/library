import { ICrudRepository } from './i-crud-repository';
import { Product } from '../../models';

export abstract class IProductsRepository extends ICrudRepository<Product> {
}
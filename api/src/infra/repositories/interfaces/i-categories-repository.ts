import { ICrudRepository } from './i-crud-repository';
import { Category } from '../../../domain/models';

export abstract class ICategoriesRepository extends ICrudRepository<Category> {
}
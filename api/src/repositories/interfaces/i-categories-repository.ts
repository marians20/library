import { ICrudRepository } from "./i-crud-repository";
import { Category } from "../../models";

export abstract class ICategoriesRepository extends ICrudRepository<Category> {
}
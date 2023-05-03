import { CategoryDto } from "src/models/category/category.dto";

export class AnnounceCategoryUpdateCommand {
  constructor(public categoryId: number, public categoryDto: CategoryDto) {}
}

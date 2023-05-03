import { Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryService } from "src/controllers/category/category.service";
import { AnnounceCategoryUpdateCommand } from "../commands/announce-category-update.command";

@CommandHandler(AnnounceCategoryUpdateCommand)
@Injectable()
export class AnnounceCategoryUpdateHandler
  implements ICommandHandler<AnnounceCategoryUpdateCommand>
{
  constructor(private categoryService: CategoryService) {}

  async execute(command: AnnounceCategoryUpdateCommand): Promise<any> {
    const { categoryId, categoryDto } = command;
    return await this.categoryService.categoryUpdateByBroker(
      categoryId,
      categoryDto
    );
  }
}

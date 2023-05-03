import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDto } from "src/models/category/category.dto";
import { CategoryEntity } from "src/models/category/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {}

  getCount(): Promise<number> {
    return this.categoryRepo.count({});
  }

  getCategories(page = 1, take = 25): Promise<CategoryEntity[]> {
    return this.categoryRepo.find({
      /* skip: take * (page - 1),
      take, */
      order: {
        id: "DESC",
      },
      // relations: ['articles'],
    });
  }

  getOneCategory(categoryId: number): Promise<CategoryEntity> {
    return this.categoryRepo.findOneOrFail({
      where: { id: categoryId },
      relations: ["articles"],
    });
  }

  async createCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const catToCreate: CategoryEntity = { ...categoryDto };
    return this.categoryRepo.save(catToCreate);
  }

  async updateCategory(
    categoryId: number,
    commentDto: CategoryDto
  ): Promise<CategoryEntity> {
    await this.categoryRepo.findOneOrFail({ where: { id: categoryId } });
    const commentDtoWithPayload: CategoryEntity = {
      ...commentDto,
    };
    await this.categoryRepo.update(categoryId, commentDtoWithPayload);
    return await this.categoryRepo.findOneOrFail({ where: { id: categoryId } });
  }

  async categoryUpdateByBroker(
    categoryId: number,
    categoryDto: CategoryDto
  ): Promise<any> {
    await this.categoryRepo.findOneOrFail({ where: { id: categoryId } });
    const categoryDtoWithPayload: CategoryEntity = {
      ...categoryDto,
    };
    await this.categoryRepo.update(categoryId, categoryDtoWithPayload);
    return await this.categoryRepo.findOneOrFail({ where: { id: categoryId } });
  }

  async removeCategory(categoryId: number): Promise<CategoryEntity> {
    const comment = await this.categoryRepo.findOneOrFail({
      where: { id: categoryId },
    });
    return this.categoryRepo.remove(comment);
  }
}

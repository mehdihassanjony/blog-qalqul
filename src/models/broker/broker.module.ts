import { Module } from "@nestjs/common";
import { BrokerService } from "./broker.service";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { BrokerController } from "./broker.controller";
import { AnnounceCategoryUpdateHandler } from "./command-handlers/announce-category-update.handler";
import { CategoryModule } from "src/controllers/category/category.module";

@Module({
  imports: [ConfigModule, CqrsModule, CategoryModule],
  providers: [BrokerService, AnnounceCategoryUpdateHandler],
  controllers: [BrokerController],
  exports: [BrokerService],
})
export class BrokerModule {}

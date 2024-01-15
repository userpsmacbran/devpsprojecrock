import { Module } from "@nestjs/common";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}

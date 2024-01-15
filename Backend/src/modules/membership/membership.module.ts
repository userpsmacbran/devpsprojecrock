import { Module } from "@nestjs/common";
import { MembershipController } from "./membership.controller";
import { MembershipService } from "./membership.service";
import { StripeModule } from "../stripe/stripe.module";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { Country } from "src/entities/country.entity";

@Module({
  imports: [StripeModule, TypeOrmModule.forFeature([Membership, Country])],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}

import { Module, forwardRef } from "@nestjs/common";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { MembershipModule } from "../membership/membership.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Membership]), UserModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}

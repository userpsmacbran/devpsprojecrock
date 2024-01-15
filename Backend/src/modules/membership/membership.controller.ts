import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { create } from "domain";
import { MembershipService } from "./membership.service";

@Controller("membership")
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post("create")
  async createMembership(@Body() body) {
    try {
      const { name, amount, currency, countryId, type } = body;

      const membership = await this.membershipService.createMembership({
        name,
        amount,
        currency,
        countryId,
        type,
      });
      return membership;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get("/:idCountry")
  async getMembershipByCountry(@Param("idCountry") idCountry: number) {
    try {
      const memberships =
        await this.membershipService.getMembershipByCountry(idCountry);
      return memberships;
    } catch (error) {
      return { error: error.message };
    }
  }
}

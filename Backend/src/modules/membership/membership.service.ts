import { HttpException, Injectable } from "@nestjs/common";
import { StripeService } from "../stripe/stripe.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { Repository } from "typeorm";
import { Country } from "src/entities/country.entity";

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly StripeService: StripeService
  ) {}

  async createMembership(body: any) {
    try {
      const { name, amount, currency, countryId, type } = body;
      console.log(
        `name: ${name}, amount: ${amount}, currency: ${currency}, countryId: ${countryId}, type: ${type}`
      );

      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) throw new HttpException("COUNTRY_NOT_FOUND", 404);
      const price = await this.StripeService.createStripePrice(
        name,
        amount,
        currency
      );

      const membership = new Membership();
      membership.name = name;
      membership.price = price.id;
      membership.currency = currency;
      membership.country = country;
      membership.type = type;

      await this.membershipRepository.save(membership);
      return membership;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async getMembershipByCountry(idCountry: number) {
    try {
      const memberships = await this.membershipRepository.find({
        where: { country: { id: idCountry } },
      });
      return memberships;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}

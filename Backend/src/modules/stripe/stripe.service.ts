import { HttpException, Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { Repository } from "typeorm";
const configService = new ConfigService();

@Injectable()
export class StripeService {
  private readonly stripe = new Stripe(configService.get("STRIPE_KEY"), {
    apiVersion: "2023-10-16",
  });

  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>
  ) {}

  async createCheckoutSessionSubscription(
    membershipId: number,
    userId: number
  ) {
    try {
      console.log(membershipId);
      const membership = await this.membershipRepository.findOne({
        where: { id: membershipId },
      });

      if (!membership) throw new HttpException("MEMBERSHIP_NOT_FOUND", 404);

      const session = await this.stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: `${membership.price}`,
            quantity: 1,
          },
        ],
        success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/subscriptions`,
        metadata: {
          userId: userId,
          membershipId: membership.id,
        },
      });

      return session;
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  async getCheckoutSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      return session;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async createStripePrice(name: string, amount: number, currency: string) {
    try {
      const price = await this.stripe.prices.create({
        recurring: {
          interval: "month",
        },
        unit_amount: amount,
        currency,
        product_data: {
          name,
        },
      });
      return price;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  constructEventFromPayload(signature: string, payload: Buffer) {
    const secret = configService.get("STRIPE_WEBHOOK_SECRET");

    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async processWebhookEvent(event: any): Promise<any> {
    console.log("Evento recibido: ", event.type);
    // Aqui evaluo el tipo de evento que recibo. Si es completed significa que el usuario
    // pago la membresia y debo actualizar el usuario con la membresia..

    console.log(event.data.object.metadata);
    // Aqui llega el usuario y la membresia.
    // Se debe consumir servicio de membresia para actualizar el usuario.
  }
}

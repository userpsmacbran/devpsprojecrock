import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  HttpException,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post("create-checkout-session-subscription")
  async createCheckoutSessionSubscription(
    @Body("membershipId") membershipId: number,
    @Body("userId") userId: number
  ): Promise<{ sessionId: string } | { error: string }> {
    const session = await this.stripeService.createCheckoutSessionSubscription(
      membershipId,
      userId
    );

    if ("error" in session) {
      return { error: "error" };
    }

    return { sessionId: session.id };
  }

  @Post("checkout-session-subscription")
  async getCheckoutSession(@Body("sessionId") sessionId: string) {
    try {
      const session = await this.stripeService.getCheckoutSession(sessionId);

      if (session.payment_status === "paid") {
      }
      return session;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post("webhook")
  async handleWebhookEvent(
    @Headers("stripe-signature") signature: string,
    @Req() request: any
  ) {
    try {
      if (!signature) {
        throw new BadRequestException("Missing stripe-signature header");
      }

      const event = await this.stripeService.constructEventFromPayload(
        signature,
        request.rawBody
      );
      if (!event) throw new BadRequestException("Invalid Stripe signature");

      // Procesar el evento
      const processedEvent =
        await this.stripeService.processWebhookEvent(event);

      // Devolver una respuesta exitosa al servidor de Stripe
      return { received: true };
    } catch (error) {
      console.error("Error processing webhook event:", error.message);
      return { error: "Failed to process webhook event" };
    }
  }
}

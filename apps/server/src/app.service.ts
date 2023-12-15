import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import products from './products';

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
}

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello() {
    return 'Hello World!';
  }

  getProducts() {
    return products;
  }

  async createStripePaymentIntent(createParams: CreatePaymentIntentParams) {
    const { amount, currency } = createParams;
    const stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY')!);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    });

    return paymentIntent;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, CreatePaymentIntentParams } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Post('/stripe-processor')
  async createStripeIntent(@Body() body: CreatePaymentIntentParams) {
    const paymentIntent = await this.appService.createStripePaymentIntent(body);
    return {
      client_secret: paymentIntent.client_secret,
    };
  }
}

import * as Pusher from "pusher";

export class ServiceProviderService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: "2104297",
      key: "015532b0b830ceb91802",
      secret: "b9cafd804c701f41b956",
      cluster: "ap2",
      useTLS: true,
    });
  }

  // When a new order is created (you can add this later)
  async notifyProvider(providerId: number, message: string) {
    await this.pusher.trigger(`provider-${providerId}`, "new-order", {
      orderDetails: message,
    });
  }
}

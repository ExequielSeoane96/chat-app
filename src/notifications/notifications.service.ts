import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';

@Injectable()
export class NotificationsService {
  constructor() {
    webpush.setVapidDetails(
      'seoane.exequiel@gmail.com',
      process.env.VAPID_PUBLIC_KEY || 'TU_VAPID_PUBLIC_KEY',
      process.env.VAPID_PRIVATE_KEY || 'TU_VAPID_PRIVATE_KEY',
    );
  }

  async sendNotification(subscription: any, payload: any) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }
}

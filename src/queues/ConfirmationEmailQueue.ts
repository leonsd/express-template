import { ClientQueue } from './ClientQueue';
import { IConfirmationEmail } from '../interfaces/ConfirmationEmail';
import InternalException from '../exceptions/InternalException';

export class ConfirmationEmailQueue {
  public static queueName = process.env.SEND_CONFIRMATION_EMAIL_QUEUE;

  constructor(private readonly clientQueue: ClientQueue) {}

  static getInstance(): ConfirmationEmailQueue {
    if (!ConfirmationEmailQueue.queueName) {
      throw new InternalException(
        'environment variable SEND_CONFIRMATION_EMAIL_QUEUE not set',
      );
    }

    const clientQueue = ClientQueue.getInstance(
      ConfirmationEmailQueue.queueName,
    );

    return new ConfirmationEmailQueue(clientQueue);
  }

  enqueue = async (message: IConfirmationEmail): Promise<void> => {
    await this.clientQueue.enqueue<IConfirmationEmail>(message);
  };
}

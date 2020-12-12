import mongoose from 'mongoose';
import { logger } from '@junior-senior-coin-brew/logger';

export async function connectToDataBase(
  connectionString: string,
  debug?: true
): Promise<void> {
  logger.info('Connecting to database...');

  try {
    mongoose.set('debug', debug);

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('Connected to database established!');
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
      }),
    }),
  ],
})
export class DbModule {}

import { DbModule } from './db/db.module';
import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DbModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

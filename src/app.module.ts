import { DbModule } from './db/db.module';
import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [DbModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

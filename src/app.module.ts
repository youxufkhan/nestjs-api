import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
@Module({
  imports: [ MikroOrmModule.forRoot({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'my-database',
    type: 'postgresql',
  }), 
  ItemsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

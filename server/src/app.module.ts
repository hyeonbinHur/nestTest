import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutController } from './about.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    RepositoriesModule,
  ],
  controllers: [AppController, AboutController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}

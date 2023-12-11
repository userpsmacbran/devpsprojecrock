import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ModePlay } from 'src/entities/modePlay.entity';
import { ModeplayModule } from '../modeplay/modeplay.module';

const configService = new ConfigService();

@Module({
  imports: [
    ModeplayModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([ModePlay]),
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

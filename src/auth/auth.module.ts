import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities';
import { JwtStrategy } from './strategies';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // console.log('JWT Secret', configService.get('JWT_SECRET'));

                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                };
            },
        }),
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET,
        //     signOptions: { expiresIn: '1h' },
        // }),
    ],
    exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}

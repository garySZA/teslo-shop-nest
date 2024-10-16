import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities';
import { UserRoleGuard } from './guards';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('check-auth-status')
    @Auth()
    checkAuthStatus(@GetUser() user: User) {
        return this.authService.checkAuthStatus(user);
    }

    @Get('private')
    @UseGuards(AuthGuard())
    testingPrivateRoute(
        @GetUser() user: User,
        @GetUser('email') userEmail: string,
        @RawHeaders() rawHeaders: string[]
    ) {
        return {
            ok: true,
            message: 'This is a private route',
            user,
            userEmail,
            rawHeaders,
        };
    }
    // @SetMetadata('roles', ['admin', 'super-user'])

    @Get('private-two')
    @RoleProtected(ValidRoles.superUser, ValidRoles.user)
    @UseGuards(AuthGuard(), UserRoleGuard)
    privateRouteTwo(@GetUser() user: User) {
        return {
            ok: true,
            user,
        };
    }

    @Get('private-three')
    @Auth(ValidRoles.admin, ValidRoles.superUser)
    privateRouteThree() {
        return {
            ok: true,
            message: 'This is a private route (three)',
        };
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(loginDto: LoginDto) {
        const authEmail = this.configService.get<string>('AUTH_EMAIL');
        const authPassword = this.configService.get<string>('AUTH_PASSWORD');

        if (
            loginDto.email !== authEmail ||
            loginDto.password !== authPassword
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: loginDto.email,
            email: loginDto.email,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
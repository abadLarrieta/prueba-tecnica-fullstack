import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { vi } from 'vitest';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const configServiceMock = {
    get: vi.fn(),
  };

  const jwtServiceMock = {
    signAsync: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token with valid credentials', async () => {
    configServiceMock.get
        .mockReturnValueOnce('admin@example.com')
        .mockReturnValueOnce('123456');

    jwtServiceMock.signAsync.mockResolvedValue('fake-jwt-token');

    const result = await service.login({
      email: 'admin@example.com',
      password: '123456',
    });

    expect(result).toEqual({
      access_token: 'fake-jwt-token',
    });

    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
      sub: 'admin@example.com',
      email: 'admin@example.com',
    });
  });

  it('should throw UnauthorizedException with invalid email', async () => {
    configServiceMock.get
        .mockReturnValueOnce('admin@example.com')
        .mockReturnValueOnce('123456');

    await expect(
        service.login({
          email: 'incorrecto@example.com',
          password: '123456',
        }),
    ).rejects.toThrow(UnauthorizedException);

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException with invalid password', async () => {
    configServiceMock.get
        .mockReturnValueOnce('admin@example.com')
        .mockReturnValueOnce('123456');

    await expect(
        service.login({
          email: 'admin@example.com',
          password: 'incorrecta',
        }),
    ).rejects.toThrow(UnauthorizedException);

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
  });
});
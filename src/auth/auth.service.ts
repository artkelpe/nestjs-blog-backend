import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly predefinedPasswordHash = this.configService.get<string>('ADMIN_PASS_HASH') as string;

  constructor(private configService: ConfigService) {}

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.predefinedPasswordHash);
  }
}

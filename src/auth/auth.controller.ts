import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('password') password: string, @Req() req: Request, @Res() res: Response) {
    const isValid = await this.authService.validatePassword(password);
    if (isValid) {
      req.session.isAuthenticated = true;
      return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid password' });
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logout successful' });
    });
  }
}

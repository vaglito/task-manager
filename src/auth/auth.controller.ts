import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth') // Decorador que define la ruta base para los endpoints de este controlador
export class AuthController {
  // Constructor que recibe las dependencias inyectadas
  constructor(private readonly authService: AuthService) {} // Inyectar AuthService

  /**
   * Endpoint para el login de usuarios.
   * @UseGuards(LocalAuthGuard) - Aplica el guard de autenticación local.
   * @Post('login') - Define que este método maneja solicitudes POST en la ruta '/auth/login'.
   * @param req - Objeto de solicitud que contiene la información del usuario autenticado.
   * @returns Un objeto con el token JWT generado.
   */
  @UseGuards(LocalAuthGuard) // Aplicar el guard de autenticación local
  @Post('login') // Decorador que define un endpoint POST en la ruta '/auth/login'
  async login(@Request() req) {
    // Llamar al método login del AuthService para generar un token JWT
    return this.authService.login(req.user);
  }
}
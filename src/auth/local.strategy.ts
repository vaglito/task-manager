import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') { // Extender la clase base PassportStrategy
  // Constructor que recibe las dependencias inyectadas
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // Especificar que el campo 'email' se usará como nombre de usuario
      passwordField: 'password', // Especificar que el campo 'password' se usará como contraseña
    });
  }

  /**
   * Método para validar las credenciales del usuario.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña proporcionada por el usuario.
   * @returns El objeto del usuario si las credenciales son válidas.
   * @throws UnauthorizedException si las credenciales no son válidas.
   */
  async validate(email: string, password: string): Promise<any> {
    // Validar las credenciales del usuario utilizando el AuthService
    const user = await this.authService.validateUser(email, password);

    // Si las credenciales no son válidas, lanzar una excepción
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Si las credenciales son válidas, devolver el objeto del usuario
    return user;
  }
}
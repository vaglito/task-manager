import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Constructor que recibe las dependencias inyectadas
  constructor(
    private readonly usersService: UsersService, // Servicio de usuarios
    private readonly jwtService: JwtService, // Servicio de JWT
  ) {}

  /**
   * Método para validar las credenciales de un usuario.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña proporcionada por el usuario.
   * @returns Un objeto de usuario sin la contraseña si las credenciales son válidas, de lo contrario null.
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Buscar un usuario por su correo electrónico
    const user = await this.usersService.findUserEmail(email);

    // Si el usuario existe y la contraseña coincide
    if (user && (await bcrypt.compare(password, user.password))) {
      // Excluir la contraseña del objeto de usuario antes de devolverlo
      const { password, ...result } = user;
      return result; // Devolver el usuario sin la contraseña
    }

    // Si las credenciales no son válidas, devolver null
    return null;
  }

  /**
   * Método para generar un token JWT después de que el usuario ha sido validado.
   * @param user - El objeto de usuario autenticado.
   * @returns Un objeto que contiene el token JWT.
   */
  async login(user: any) {
    // Crear el payload del token JWT con el correo electrónico y el ID del usuario
    const payload = { email: user.email, sub: user.id };

    // Devolver un objeto con el token JWT generado
    return {
      access_token: this.jwtService.sign(payload), // Firmar el payload y generar el token
    };
  }
}
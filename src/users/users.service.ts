import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Constructor que recibe las dependencias inyectadas
  constructor(private readonly prisma: PrismaService) {} // Inyectar PrismaService

  /**
   * Método para crear un nuevo usuario.
   * @param data - Los datos del usuario a crear.
   * @returns El objeto del usuario creado.
   * @throws ConflictException si el usuario ya existe.
   */
  async createUser(data: User): Promise<User> {
    // Buscar un usuario existente con el mismo correo electrónico
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // Si el usuario ya existe, lanzar una excepción de conflicto
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    // Generar un salt para hashear la contraseña
    const salt = await bcrypt.genSalt();

    // Hashear la contraseña proporcionada por el usuario
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Crear un nuevo usuario en la base de datos utilizando Prisma
    return this.prisma.user.create({
      data: {
        email: data.email, // Correo electrónico del usuario
        password: hashedPassword, // Contraseña hasheada
      },
    });
  }

  /**
   * Método para buscar un usuario por su correo electrónico.
   * @param email - El correo electrónico del usuario.
   * @returns El objeto del usuario si se encuentra, de lo contrario null.
   */
  async findUserEmail(email: string): Promise<User> {
    // Buscar un usuario por su correo electrónico utilizando Prisma
    return this.prisma.user.findUnique({
      where: {
        email: email, // Correo electrónico del usuario
      },
    });
  }
}


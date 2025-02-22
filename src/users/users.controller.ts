import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
  Param,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users') // Decorador que define la ruta base para los endpoints de este controlador
export class UsersController {
  // Constructor que recibe las dependencias inyectadas
  constructor(private usersService: UsersService) {} // Inyectar UsersService

  /**
   * Endpoint para obtener un usuario por su correo electrónico.
   * @param email - El correo electrónico del usuario.
   * @returns El objeto del usuario si se encuentra.
   * @throws NotFoundException si el usuario no existe.
   */
  @Get(':email') // Decorador que define un endpoint GET en la ruta '/users/:email'
  async getUsers(@Param('email') email: string) {
    // Buscar un usuario por su correo electrónico utilizando el UsersService
    const userFound = await this.usersService.findUserEmail(email);

    // Si el usuario no se encuentra, lanzar una excepción
    if (!userFound) throw new NotFoundException('Usuario no encontrado');

    // Si el usuario se encuentra, devolverlo
    return userFound;
  }

  /**
   * Endpoint para crear un nuevo usuario.
   * @param data - Los datos del usuario a crear.
   * @returns El objeto del usuario creado.
   * @throws ConflictException si el usuario ya existe.
   * @throws BadRequestException si los datos proporcionados no son válidos.
   */
  @Post() // Decorador que define un endpoint POST en la ruta '/users'
  async createUser(@Body() data: User) {
    try {
      // Intentar crear un nuevo usuario utilizando el UsersService
      return await this.usersService.createUser(data);
    } catch (error) {
      // Si el error es una ConflictException, lanzar una excepción de conflicto
      if (error instanceof ConflictException) {
        throw new ConflictException('El usuario ya existe');
      }
      // Si el error es otro tipo, lanzar una excepción de solicitud incorrecta
      throw new BadRequestException('No se proporcionaron los datos correctos');
    }
  }
}
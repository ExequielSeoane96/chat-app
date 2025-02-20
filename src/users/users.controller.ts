import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: { username: string; email: string; password: string }) {
    const existingUser = await this.usersService.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.create(createUserDto);
    // Convertir el documento a JSON para incluir el virtual "id"
    const userData = JSON.parse(JSON.stringify(user));
    return { message: 'Usuario registrado exitosamente', userId: userData.id };
  }

    // Nuevo endpoint para obtener todos los usuarios
    @Get()
    async getAllUsers() {
      const users = await this.usersService.findAll();
      return { users };
    }
    
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { id },
            select:{
                id: true,
                name: true,
                email: true
            }
        });
        if(user){
            return user;
        } else {
            throw  new HttpException('User não cadastrado', HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(createUserDto : CreateUserDto){
        try{
        const user = await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                passwordHash: createUserDto.password
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        });
        return user;
        } catch (error){
            throw new HttpException('Erro ao criar usuário'+ error, HttpStatus.BAD_REQUEST);
        }

    }
}
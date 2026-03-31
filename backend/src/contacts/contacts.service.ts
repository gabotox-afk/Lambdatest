import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  // Inyectamos el servicio de Prisma para usar la DB [cite: 16, 44]
  constructor(private prisma: PrismaService) {}

  // Crear un contacto (nombre + email) [cite: 9]
  create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  // Listar todos los contactos [cite: 10]
  findAll() {
    return this.prisma.contact.findMany();
  }

  // Eliminar un contacto por ID [cite: 11]
  remove(id: number) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
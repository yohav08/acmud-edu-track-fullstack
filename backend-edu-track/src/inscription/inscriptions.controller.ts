import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  /**
   * ! Crear inscripción 
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createInscription(@Body() createInscriptionDto: CreateInscriptionDto) {
    return this.inscriptionsService.createInscription(createInscriptionDto);
  }

  /**
   * ! Buscar todas las inscripciones
   */
  @Get('getAllInscriptions')
  getAllInscriptions() {
    return this.inscriptionsService.findAllInscriptions();
  }

  /**
   * ! Buscar inscripción por ID
   */
  @Get(':id')
  getInscriptionById(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionsService.findInscriptionById(id);
  }

  /**
   * ! Buscar inscripciones por fecha
   */
  @Get('fecha/:fecha')
  getInscriptionsByDate(@Param('fecha') fecha: string) {
    return this.inscriptionsService.findInscriptionsByDate(fecha);
  }

  /**
   * ! Buscar inscripciones por estudiante
   */
  @Get('estudiante/:estudiante_id')
  getInscriptionsByStudent(
    @Param('estudiante_id', new ParseUUIDPipe({ version: '4' })) 
    estudiante_id: string
  ) {
    return this.inscriptionsService.findInscriptionsByStudent(estudiante_id);
  }

  /**
   * ! Buscar inscripciones por curso
   */
  @Get('curso/:curso_id')
  getInscriptionsByCourse(@Param('curso_id', ParseIntPipe) curso_id: number) {
    return this.inscriptionsService.findInscriptionsByCourse(curso_id);
  }

  /**
   * ! Buscar inscripciones con detalles completos
   */
  @Get('detalles/completos')
  getInscriptionsWithDetails() {
    return this.inscriptionsService.findInscriptionsWithDetails();
  }

  /**
   * ! Actualizar inscripción 
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateInscription(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateInscriptionDto: UpdateInscriptionDto,
  ) {
    return this.inscriptionsService.updateInscription(id, updateInscriptionDto);
  }

  /**
   * ! Eliminar inscripción 
   */
  @Delete(':id')
  removeInscription(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionsService.removeInscription(id);
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CriarDesafioDto from './dtos/criar-desafio.dto';
import Desafio from './interfaces/desafio.interface';
import { DesafiosService } from './desafios.service';
import DesafioStatusValidationPipe from './pipes/desafio-status-validation.pipe';
import AtualizarDesafioDTO from './dtos/atualizar-desafio.dto';
import AtribuirDesafioPartidaDTO from './dtos/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    return await this.desafiosService.criarDesafio(criarDesafioDto);
  }

  @Get()
  async consultarDesafios(
    @Query('idJogador') _id: string,
  ): Promise<Array<Desafio>> {
    return _id
      ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
      : await this.desafiosService.consultarTodosDesafios();
  }

  @Put('/:desafio')
  async atualizarDesafio(
    @Body(DesafioStatusValidationPipe) atualizarDesafioDto: AtualizarDesafioDTO,
    @Param('desafio') _id: string,
  ): Promise<void> {
    await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
  }

  @Post('/:desafio/partida')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDTO,
    @Param('desafio') _id: string,
  ): Promise<void> {
    return await this.desafiosService.atribuirDesafioPartida(
      _id,
      atribuirDesafioPartidaDto,
    );
  }

  @Delete('/:_id')
  async deletarDesafio(@Param('_id') _id: string): Promise<void> {
    this.desafiosService.deletarDesafio(_id);
  }
}

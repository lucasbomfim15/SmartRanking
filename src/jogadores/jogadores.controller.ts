import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CriarJogadorDTO from './dtos/criarJogadorDTO';
import { JogadoresService } from './jogadores.service';
import Jogador from './interfaces/jogador.interface';
import JogadoresValidacaoParametrosPipe from './pipes/jogadores-validacao-parametros.pipe';
import AtualizarJogadorDTO from './dtos/atualizarJogadorDTO';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async criarJogador(
    @Body() criarJogadorDTO: CriarJogadorDTO,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDTO);
  }

  @Put(':_id')
  @UsePipes(new ValidationPipe())
  async atualizarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
    @Body()
    atualizarJogadorDTO: AtualizarJogadorDTO,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDTO);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get(':_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete(':_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}

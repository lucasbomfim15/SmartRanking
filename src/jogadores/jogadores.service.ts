import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criarJogadorDTO';
import Jogador from './interfaces/jogador.interface';
import * as uiid from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
    const { email } = criarJogadorDTO;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDTO);
    } else {
      await this.criar(criarJogadorDTO);
    }
  }

  private criar(criarJogadorDTO: CriarJogadorDTO): void {
    const { nome, telefoneCelular, email } = criarJogadorDTO;

    const jogador: Jogador = {
      _id: uiid.v4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(
      `criarAtualizarJogador: ${JSON.stringify(criarJogadorDTO)}`,
    );

    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDTO: CriarJogadorDTO,
  ): void {
    const { nome } = criarJogadorDTO;

    jogadorEncontrado.nome = nome;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }
}

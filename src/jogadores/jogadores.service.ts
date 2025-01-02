import { Injectable, NotFoundException } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criarJogadorDTO';
import Jogador from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
    const { email } = criarJogadorDTO;

    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado);
    } else {
      await this.criar(criarJogadorDTO);
    }
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);

    return await jogadorCriado.save();

    // const { nome, telefoneCelular, email } = criarJogadorDTO;

    // const jogador: Jogador = {
    //   _id: uiid.v4(),
    //   nome,
    //   telefoneCelular,
    //   email,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   urlFotoJogador: 'www.google.com.br/foto123.jpg',
    // };
    // this.logger.log(
    //   `criarAtualizarJogador: ${JSON.stringify(criarJogadorDTO)}`,
    // );

    // this.jogadores.push(jogador);
  }

  private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDTO.email },
        { $set: criarJogadorDTO },
      )
      .exec();

    // const { nome } = criarJogadorDTO;

    // jogadorEncontrado.nome = nome;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    // return await this.jogadores;
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.findOneAndDelete({ email }).exec();

    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== jogadorEncontrado.email,
    // );
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CriarJogadorDTO from './dtos/criarJogadorDTO';
import Jogador from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AtualizarJogadorDTO from './dtos/atualizarJogadorDTO';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDTO;

    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        email,
      })
      .exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDTO: AtualizarJogadorDTO,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        _id,
      })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDTO })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    // return await this.jogadores;
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        _id,
      })
      .exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({
        _id,
      })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return await this.jogadorModel.findOneAndDelete({ _id }).exec();
  }
}

import mongoose, { Document } from 'mongoose';
import { DesafioStatus } from 'src/categorias/interfaces/desafio-status.enum';
import Jogador from 'src/jogadores/interfaces/jogador.interface';

export default interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: mongoose.Schema.Types.ObjectId;
}

export interface Partida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<Resultado>;
}

export interface Resultado {
  set: string;
}

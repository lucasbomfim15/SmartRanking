export default interface Jogador {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}

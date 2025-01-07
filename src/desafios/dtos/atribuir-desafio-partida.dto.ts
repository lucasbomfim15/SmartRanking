import { IsNotEmpty } from 'class-validator';

export default class AtribuirDesafioPartidaDTO {
  @IsNotEmpty()
  def: string;

  @IsNotEmpty()
  resultado: { set: string }[];
}

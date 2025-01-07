import { IsOptional } from 'class-validator';
import { DesafioStatus } from 'src/categorias/interfaces/desafio-status.enum';

export default class AtualizarDesafioDTO {
  @IsOptional()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatus;
}

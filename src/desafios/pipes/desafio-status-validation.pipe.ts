import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DesafioStatus } from 'src/categorias/interfaces/desafio-status.enum';

export default class DesafioStatusValidationPipe implements PipeTransform {
  readonly statusPermitidos = [
    DesafioStatus.ACEITO,
    DesafioStatus.NEGADO,
    DesafioStatus.CANCELADO,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.ehStatusValido(status)) {
      throw new BadRequestException(`${status} é um status invalido`);
    }

    return value;
  }

  private ehStatusValido(status: any) {
    const idx = this.statusPermitidos.indexOf(status);

    return idx !== -1;
  }
}

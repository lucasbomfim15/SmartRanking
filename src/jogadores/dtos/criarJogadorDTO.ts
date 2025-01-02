import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CriarJogadorDTO {
  @IsString()
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}

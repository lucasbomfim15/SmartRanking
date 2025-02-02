import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}

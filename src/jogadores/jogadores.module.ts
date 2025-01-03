import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { jogadorSchema } from './interfaces/jogador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: jogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports: [JogadoresService],
})
export class JogadoresModule {}

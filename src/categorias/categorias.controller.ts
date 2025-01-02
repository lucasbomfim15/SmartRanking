import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import Categoria from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import CriarCategoriaDTO from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Post()
  @UseGuards(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDTO);
  }

  @Get()
  async consultarCategorias(): Promise<Categoria[]> {
    return await this.categoriaService.consultarTodasCategorias();
  }

  @Get(':categoria')
  async consultarCategoriaPeloId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriaService.consultarCategoriaPeloId(categoria);
  }
}

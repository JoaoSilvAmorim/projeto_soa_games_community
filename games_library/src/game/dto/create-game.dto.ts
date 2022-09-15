/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateGameDto {
  id?: number;
  @ApiProperty({ example: 'The Last of Us', description: 'Título do jogo' })
  title: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  thumbnail: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  short_description: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  game_url: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  genre: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  platform: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  publisher: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  developer: string;
  @ApiProperty({ example: '2022-01-30', description: 'Data de Lançamento' })
  release_date: string;
  @ApiProperty({ example: 'Ação', description: 'Gênero do jogo' })
  freetogame_profile_url: string;
}

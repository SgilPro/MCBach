import { AlbumService } from './album.service';
import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from './dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('new-releases')
  getNewReleases(@Query() dto: PaginationDto) {
    console.log(dto);
    return this.albumService.getNewReleases(dto.limit, dto.offset);
  }
}

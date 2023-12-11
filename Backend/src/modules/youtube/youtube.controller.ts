import { Controller, Get, Param, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { QueryYoutube } from './dto/Query.dto';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  async findByTitle(@Query() query: QueryYoutube) {
    const { title, type } = query;
    return await this.youtubeService.findByTitle(title, Number(type));
  }

  @Get(':videoId')
  async findById(@Param('videoId') videoId: string) {
    console.log(videoId);
    return await this.youtubeService.findById(videoId);
  }

  @Get('duration')
  async getDuration(@Query() query: QueryYoutube) {
    const { idVideo } = query;
    return await this.youtubeService.getDuration(idVideo);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayListCompanyService } from './play_list_company.service';
import { CreatePlayListCompanyDto } from './dto/create-play_list_company.dto';
import { UpdatePlayListCompanyDto } from './dto/update-play_list_company.dto';

@Controller('play-list-company')
export class PlayListCompanyController {
  constructor(private readonly playListCompanyService: PlayListCompanyService) {}

  @Post()
  create(@Body() createPlayListCompanyDto: CreatePlayListCompanyDto) {
    return this.playListCompanyService.create(createPlayListCompanyDto);
  }

  @Get()
  findAll() {
    return this.playListCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playListCompanyService.findByIdCompany(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayListCompanyDto: UpdatePlayListCompanyDto) {
    return this.playListCompanyService.update(+id, updatePlayListCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playListCompanyService.remove(+id);
  }
}

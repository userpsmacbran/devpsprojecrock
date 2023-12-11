import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayListCompanyDto } from './create-play_list_company.dto';

export class UpdatePlayListCompanyDto extends PartialType(CreatePlayListCompanyDto) {}

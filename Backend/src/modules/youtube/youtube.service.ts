import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cleanData, cleanDuration, cleanVideo } from 'src/utils/cleanData';

const configService = new ConfigService();

@Injectable()
export class YoutubeService {
  async findByTitle(title: string, type: number) {
    if (type === 0) {
      const res = await fetch(
        `${configService.get(
          'API_YOUTUBE'
        )}search?q=${title}&key=${configService.get(
          'API_KEY'
        )}&part=snippet&type=video&maxResults=20`
      );

      const dataRaw = await res.json();

      return await cleanData(dataRaw.items);
    } else if (type === 1) {
      const res = await fetch(
        `${configService.get('API_YOUTUBE')}search?q=${
          title + '' + 'karaoke'
        }&key=${configService.get(
          'API_KEY'
        )}&part=snippet&type=video&maxResults=20`
      );

      const dataRaw = await res.json();

      return await cleanData(dataRaw.items, type);
    }
  }

  async findById(idVideo: string) {
    const res = await fetch(
      `${configService.get(
        'API_YOUTUBE'
      )}videos?part=snippet&id=${idVideo}&key=${configService.get('API_KEY')}`
    );

    return cleanVideo((await res.json()).items[0]);
  }

  async getDuration(idVideo: string) {
    try {
      const res = await fetch(
        `${configService.get('API_YOUTUBE')}videos?id=${String(
          idVideo
        )}&key=${configService.get('API_KEY')}&part=contentDetails`
      );

      const dataRaw = await res.json();

      if (dataRaw.items.length < 1) {
        throw new HttpException('Video no encontrado', 400);
      }

      return cleanDuration(dataRaw.items[0].contentDetails.duration);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}

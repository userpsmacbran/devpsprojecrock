import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { cleanData, cleanDuration, cleanVideo } from "src/utils/cleanData";
import axios from "axios";

const configService = new ConfigService();

@Injectable()
export class YoutubeService {
  private readonly apiKey: string = "AIzaSyBlwjldV-WzT-d_ER0R25ljIWGlVzgW2Yo";
  private readonly apiUrl: string = "https://www.googleapis.com/youtube/v3/";

  async searchVideosByTitle(title: string, type: number) {
    try {
      const searchTerm = type == 0 ? `${title}` : `${title} karaoke`;
      console.log("searchTerm:", searchTerm);

      const response = await axios.get(`${this.apiUrl}search`, {
        params: {
          q: searchTerm,
          key: this.apiKey,
          part: "snippet",
          type: "video",
          maxResults: 10,
        },
      });

      const videoItems = response.data.items;
      const videos = await Promise.all(
        videoItems.map(async (item: any) => this.mapVideoItem(item))
      );

      return videos;
    } catch (error) {
      console.error("Error al buscar videos:", error.message);
      throw error;
    }
  }

  private async mapVideoItem(item: any) {
    const videoId = item.id.videoId;
    const contentDetails = await this.getVideoDetails(videoId);

    const durationRaw = contentDetails.duration;
    const durationInMilliseconds =
      this.cleanDurationToMilliseconds(durationRaw);

    return {
      id_video: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      chanelTitle: item.snippet.channelTitle,
      miniaturas: {
        default: item.snippet.thumbnails.default,
        medium: item.snippet.thumbnails.medium,
        high: item.snippet.thumbnails.high,
      },
      fechaDePublicacion: item.snippet.publishTime,
      duration: durationInMilliseconds,
    };
  }

  private cleanDurationToMilliseconds(durationRaw: string): number {
    const minutes =
      Number(durationRaw.split("PT")[1]?.split("M")[0]) * 60 * 1000;
    const seconds =
      Number(durationRaw.split("PT")[1]?.split("M")[1]?.split("S")[0]) * 1000;

    return minutes + seconds;
  }
  private async getVideoDetails(videoId: string) {
    try {
      const response = await axios.get(`${this.apiUrl}videos`, {
        params: {
          part: "contentDetails",
          id: videoId,
          key: this.apiKey,
        },
      });

      return response.data.items[0].contentDetails;
    } catch (error) {
      console.error("Error al obtener detalles del video:", error.message);
      throw error;
    }
  }

  async findById(idVideo: string) {
    const res = await fetch(
      `${configService.get(
        "API_YOUTUBE"
      )}videos?part=snippet&id=${idVideo}&key=${configService.get("API_KEY")}`
    );
    return cleanVideo((await res.json()).items[0]);
  }

  async getDuration(idVideo: string) {
    try {
      const res = await fetch(
        `${configService.get("API_YOUTUBE")}videos?id=${String(
          idVideo
        )}&key=${configService.get("API_KEY")}&part=contentDetails`
      );

      const dataRaw = await res.json();

      if (dataRaw.items.length < 1) {
        throw new HttpException("Video no encontrado", 400);
      }

      return cleanDuration(dataRaw.items[0].contentDetails.duration);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}

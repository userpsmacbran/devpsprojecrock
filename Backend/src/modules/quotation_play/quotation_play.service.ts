import { HttpException, Injectable } from "@nestjs/common";
import { CalculatePriceDto } from "./dto/create-quotation_play.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { YoutubeService } from "../youtube/youtube.service";
import {
  COST_MODEPLAY,
  MODEPLAY,
  NAME_MODEPLAY,
} from "src/constants/modePlay.enum";
import { ROLES } from "src/constants";
import { ModeplayService } from "../modeplay/modeplay.service";

@Injectable()
export class QuotationPlayService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly modeplayService: ModeplayService
  ) {}

  private calculatePriceByDuration(duration: number): number {
    // Definir las rangos de duración y sus costos en monedas
    const ranges = [
      { min: 0, max: 240000, cost: 4 }, // De 0 a 4 minutos
      { min: 240001, max: 480000, cost: 5 }, // De 4 a 8 minutos
      { min: 480001, max: 720000, cost: 6 }, // De 8 a 12 minutos
      // Agrega más rangos según sea necesario
    ];

    // Encontrar el rango correspondiente a la duración
    const range = ranges.find((r) => duration >= r.min && duration <= r.max);

    // Calcular el costo en monedas multiplicando el costo del rango por el valor base del modeplay
    return range ? range.cost : 0;
  }

  async calculatePrice(createQuotationPlayDto: CalculatePriceDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createQuotationPlayDto.idUser },
      });
      if (!user) throw new HttpException("USER_NOT_FOUND", 404);
      if (user.type !== ROLES.CLIENTE)
        throw new HttpException("USER_NOT_CLIENT", 400);

      const company = await this.userRepository.findOne({
        where: { id: createQuotationPlayDto.idCompany },
      });

      if (!company) throw new HttpException("COMPANY_NOT_FOUND", 404);
      if (company.type !== ROLES.EMPRESA)
        throw new HttpException("USER_NOT_COMPANY", 400);

      if (user.state_Wallet === 0) {
        const modeplays = await this.modeplayService.findAll();
        const idVideos = createQuotationPlayDto.idVideo.split(',');

        // Mapear sobre los idVideos y calcular el precio para cada uno
        const prices = await Promise.all(idVideos.map(async (idVideo) => {
          const duration = await this.youtubeService.getDuration(idVideo);
          const price = this.calculatePriceByDuration(duration);

          return {
            [idVideo]: {
              costs: {
                [NAME_MODEPLAY.PLATINUM]: {
                  price: price * COST_MODEPLAY.PLATINUM,
                  title: modeplays.find((m) => m.type === MODEPLAY.PLATINUM).title,
                  type: MODEPLAY.PLATINUM,
                },
                [NAME_MODEPLAY.VIP]: {
                  price: price * COST_MODEPLAY.VIP,
                  title: modeplays.find((m) => m.type === MODEPLAY.VIP).title,
                  type: MODEPLAY.VIP,
                },
                [NAME_MODEPLAY.NORMAL]: {
                  price: price * COST_MODEPLAY.NORMAL,
                  title: modeplays.find((m) => m.type === MODEPLAY.NORMAL).title,
                  type: MODEPLAY.NORMAL,
                },
              },
              duration: convertirMilisegundosATiempo(duration),
            },
          };
        }));

        return {
          message: "Ok",
          data: prices,
        };
      } else {
        throw new HttpException("WALLET_INVALID", 400);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400);
    }
  }
}

function convertirMilisegundosATiempo(
  durationInMilliseconds: number | null
): string | null {
  if (durationInMilliseconds === null) {
    return null;
  }

  const fecha = new Date(durationInMilliseconds);

  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();
  const segundos = fecha.getUTCSeconds();

  const formatoTiempo =
    [
      horas > 0 ? String(horas).padStart(2, "0") : null,
      String(minutos).padStart(2, "0"),
      String(segundos).padStart(2, "0"),
    ]
      .filter((value) => value !== null) // Filtrar valores nulos
      .join(":") || "00:00"; // Si todos los componentes son nulos, devuelve "00:00"

  return formatoTiempo;
}

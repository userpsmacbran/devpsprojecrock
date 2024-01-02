import { Controller, Get, Param, Query } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDataDashboard() {
    return await this.dashboardService.getDataDashboard();
  }
}

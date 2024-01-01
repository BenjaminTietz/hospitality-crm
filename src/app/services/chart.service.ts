import { Injectable } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js/auto';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chart: Chart | null = null;

  createChart(
    ctx: CanvasRenderingContext2D,
    type: keyof ChartTypeRegistry, // Änderung hier
    data: ChartData,
    options?: ChartOptions
  ): void {
    this.destroyChart();
    this.chart = new Chart(ctx, { type, data, options });
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
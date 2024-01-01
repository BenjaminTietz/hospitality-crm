// dashboard.component.ts

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChartService } from '../services/chart.service'; // Import des ChartService
import { Bookings } from '../../models/bookings.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBookingComponent } from '../dialog-add-booking/dialog-add-booking.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bookingChart') bookingChart!: ElementRef;

  booking: Bookings = new Bookings();
  bookingData: any[] = [];
  bookingCounts: { [key: string]: number } = {};
  totalNights: { [key: string]: number } = {};
  totalIncome: { [key: string]: number } = {};
  totalBookingIncome: number = 0;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private chartService: ChartService // Injizieren Sie den ChartService
  ) {}

  ngOnDestroy(): void {
    this.chartService.destroyChart(); // Zerstören Sie den Chart beim Verlassen der Komponente
  }

  ngAfterViewInit(): void {
    this.getBookingData();
  }

  ngOnInit(): void {}

  getBookingData() {
    this.firestore
      .collection('bookings')
      .valueChanges()
      .subscribe((data: any[]) => {
        this.bookingData = data;
        this.prepareChartData();
      });
  }

  prepareChartData() {
    let apartmentTotals: { [key: string]: number } = {};

    this.bookingCounts = {};
    this.totalNights = {};
    this.totalIncome = {};
    this.totalBookingIncome = 0;

    this.bookingData.forEach((booking) => {
      let apartment = booking.apartment;
      let totalPrice = booking.totalPrice;
      let duration = booking.duration;

      this.bookingCounts[apartment] = (this.bookingCounts[apartment] || 0) + 1;
      this.totalNights[apartment] = (this.totalNights[apartment] || 0) + duration;
      this.totalIncome[apartment] = (this.totalIncome[apartment] || 0) + totalPrice;
      this.totalBookingIncome += totalPrice;

      if (apartmentTotals[apartment]) {
        apartmentTotals[apartment] += totalPrice;
      } else {
        apartmentTotals[apartment] = totalPrice;
      }
    });

    this.createBookingChart(Object.keys(apartmentTotals), Object.values(apartmentTotals));
  }

  createBookingChart(labels: string[], data: number[]) {
    const ctx = this.bookingChart.nativeElement.getContext('2d');
    this.chartService.createChart(ctx, 'bar', { // Hier wird die createChart-Methode aufgerufen
      labels: labels,
      datasets: [
        {
          label: 'Booking Value',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }, {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
  }

  openDialog() {
    this.dialog.open(DialogAddBookingComponent);
  }
}

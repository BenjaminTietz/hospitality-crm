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
  urgentTasksCount: number = 0;

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
    this.loadUrgentTasksCount();
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
    let propertyTotals: { [key: string]: number } = {};

    this.bookingCounts = {};
    this.totalNights = {};
    this.totalIncome = {};
    this.totalBookingIncome = 0;

    this.bookingData.forEach((booking) => {
      let property = booking.property;
      let totalPrice = booking.totalPrice;
      let duration = booking.duration;

      this.bookingCounts[property] = (this.bookingCounts[property] || 0) + 1;
      this.totalNights[property] = (this.totalNights[property] || 0) + duration;
      this.totalIncome[property] = (this.totalIncome[property] || 0) + totalPrice;
      this.totalBookingIncome += totalPrice;

      if (propertyTotals[property]) {
        propertyTotals[property] += totalPrice;
      } else {
        propertyTotals[property] = totalPrice;
      }
    });

    this.createBookingChart(Object.keys(propertyTotals), Object.values(propertyTotals));
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

  loadUrgentTasksCount() {
    this.firestore.collection('tasks', ref => {
      return ref.where('status', 'in', ['To do', 'In progress'])
                .where('priority', '==', 'urgent');
    }).valueChanges().subscribe((tasks: any[]) => {
      this.urgentTasksCount = tasks.length;
    });
  }
}

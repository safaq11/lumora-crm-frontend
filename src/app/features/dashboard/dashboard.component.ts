import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../core/services/dashboard.service';
import { Dashboard } from '../../core/models/dashboard';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController
} from 'chart.js';

Chart.register(
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector:'app-dashboard',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./dashboard.component.html',
  styleUrls:['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  @ViewChild('statusChart')
statusChart!: ElementRef;

@ViewChild('priorityChart')

priorityChart!: ElementRef;
statusPieChart!: Chart;

priorityChartObj!: Chart;

  dashboard!:Dashboard;

  fullName=localStorage.getItem("fullName");

  constructor(private dashboardService:DashboardService){}

  ngOnInit():void{

      this.dashboardService.getDashboard().subscribe({
        

  next: (data) => {

    this.dashboard = data;

    setTimeout(() => {

      this.createStatusChart();

      this.createPriorityChart();

    });

  }

});
  }
  ngAfterViewInit(): void {

}
createStatusChart(): void {

  const ctx = this.statusChart.nativeElement.getContext('2d');

  if (this.statusPieChart) {
    this.statusPieChart.destroy();
  }

  this.statusPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(this.dashboard.statusCounts),
      datasets: [{
        data: Object.values(this.dashboard.statusCounts),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
          '#EC4899',
          '#14B8A6',
          '#F97316'
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

}
createPriorityChart(): void {

  const ctx = this.priorityChart.nativeElement.getContext('2d');

  if (this.priorityChartObj) {
    this.priorityChartObj.destroy();
  }

  this.priorityChartObj = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(this.dashboard.priorityCounts),
      datasets: [{
        data: Object.values(this.dashboard.priorityCounts),
        backgroundColor: [
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#6B7280'
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

}

}
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeApiService } from '../../core/services/resume-api.service';
import { DashboardStats } from '../../core/models/analysis.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private readonly api = inject(ResumeApiService);
  stats: DashboardStats | null = null;

  ngOnInit() {
    this.api.getDashboard().subscribe({
      next: (s) => (this.stats = s),
    });
  }
}

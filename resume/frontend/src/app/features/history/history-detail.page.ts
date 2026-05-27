import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ResumeApiService } from '../../core/services/resume-api.service';
import { AnalysisRecord } from '../../core/models/analysis.model';
import { ResultPanelComponent } from '../../shared/components/result-panel/result-panel.component';

@Component({
  selector: 'app-history-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ResultPanelComponent],
  templateUrl: './history-detail.page.html',
  styleUrl: './history-detail.page.scss',
})
export class HistoryDetailPage implements OnInit {
  private readonly api = inject(ResumeApiService);
  private readonly route = inject(ActivatedRoute);
  record: AnalysisRecord | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getHistoryById(id).subscribe({
      next: (r) => (this.record = r),
    });
  }
}

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeApiService } from '../../core/services/resume-api.service';
import { AnalysisRecord } from '../../core/models/analysis.model';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { ScoreColorPipe } from '../../shared/pipes/score-color.pipe';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, ScoreColorPipe],
  templateUrl: './history.page.html',
  styleUrl: './history.page.scss',
})
export class HistoryPage implements OnInit {
  private readonly api = inject(ResumeApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  records: AnalysisRecord[] = [];
  error = '';

  ngOnInit() {
    console.log('[DEBUG] HistoryPage ngOnInit called');
    this.api.getHistory().subscribe({
      next: (list) => {
        console.log('[DEBUG] getHistory received:', list);
        this.records = list;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[DEBUG] getHistory error:', err);
        this.error = '加载历史记录失败，请确认后端已启动';
        this.cdr.detectChanges();
      },
    });
  }
}
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeApiService } from '../../core/services/resume-api.service';
import { AnalysisRecord, PaginatedResponse } from '../../core/models/analysis.model';
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
  loading = false;

  currentPage = 1;
  pageSize = 10;
  total = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory(page = 1) {
    this.loading = true;
    this.currentPage = page;
    this.api.getHistory(page, this.pageSize).subscribe({
      next: (res: PaginatedResponse) => {
        this.records = res.list;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = '加载历史记录失败，请确认后端已启动';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteRecord(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('确定要删除这条记录吗？')) return;

    this.api.deleteHistory(id).subscribe({
      next: () => {
        this.loadHistory(this.currentPage);
      },
      error: () => {
        this.error = '删除失败';
        this.cdr.detectChanges();
      },
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadHistory(page);
    }
  }

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
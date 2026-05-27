import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisRecord, AnalysisResult, DashboardStats } from '../models/analysis.model';

@Injectable({ providedIn: 'root' })
export class ResumeApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3000';

  analyze(file: File, jobDescription: string, jobTitle = ''): Observable<AnalysisResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);
    formData.append('jobTitle', jobTitle);
    return this.http.post<AnalysisResult>(`${this.apiBaseUrl}/api/analyze`, formData);
  }

  getHistory(): Observable<AnalysisRecord[]> {
    return this.http.get<AnalysisRecord[]>(`${this.apiBaseUrl}/api/history`);
  }

  getHistoryById(id: number): Observable<AnalysisRecord> {
    return this.http.get<AnalysisRecord>(`${this.apiBaseUrl}/api/history/${id}`);
  }

  getDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiBaseUrl}/api/dashboard`);
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'analyze', pathMatch: 'full' },
  {
    path: 'analyze',
    loadComponent: () =>
      import('./features/analyze/analyze.page').then((m) => m.AnalyzePage),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./features/history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'history/:id',
    loadComponent: () =>
      import('./features/history/history-detail.page').then((m) => m.HistoryDetailPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  { path: '**', redirectTo: 'analyze' },
];

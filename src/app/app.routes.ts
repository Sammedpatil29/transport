import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'layout',
        pathMatch: 'full'
    },
    {
        path: 'layout',
        loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'available-rides',
                pathMatch: 'full'
            },
            {
                path: 'my-rides',
                loadComponent: () => import('./components/my-rides/my-rides.component').then(m => m.MyRidesComponent)
            },
            {
                path: 'available-rides',
                loadComponent: () => import('./components/available-rides/available-rides.component').then(m => m.AvailableRidesComponent)
            }
        ]
    }
];

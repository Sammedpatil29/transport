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
                path: 'home',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'my-rides',
                loadComponent: () => import('./components/my-rides/my-rides.component').then(m => m.MyRidesComponent)
            },
            {
                path: 'my-bookings',
                loadComponent: () => import('./components/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent)  
            },
            {
                path: 'available-rides',
                loadComponent: () => import('./components/available-rides/available-rides.component').then(m => m.AvailableRidesComponent)
            }
        ]
    }
];

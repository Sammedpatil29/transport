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
                redirectTo: 'host-ride',
                pathMatch: 'full'
            },
            {
                path: 'host-ride',
                loadComponent: () => import('./components/host-ride/host-ride.component').then(m => m.HostRideComponent)
            },
            {
                path: 'available-rides',
                loadComponent: () => import('./components/available-rides/available-rides.component').then(m => m.AvailableRidesComponent)
            }
        ]
    }
];

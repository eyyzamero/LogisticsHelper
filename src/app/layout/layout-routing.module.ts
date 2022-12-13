import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPermission } from '../core/enums';
import { AuthObservableModelObtainedGuard } from '../core/guards/auth-observable-model-obtained.guard';
import { AuthPermissionsGuard } from '../core/guards/auth-permissions.guard';
import { FireAuthGuard } from '../core/guards/fire-auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule),
        canLoad: [
          FireAuthGuard
        ]
      },
      {
        path: 'assignments',
        loadChildren: () => import('../components/assignments/assignments.module').then(m => m.AssignmentsModule),
        canLoad: [
          FireAuthGuard,
          AuthObservableModelObtainedGuard,
          AuthPermissionsGuard
        ],
        canActivate: [
          FireAuthGuard,
          AuthObservableModelObtainedGuard,
          AuthPermissionsGuard
        ],
        data: {
          requiredPermissions: new Array<UserPermission>(UserPermission.ASSIGNMENTS)
        }
      },
      {
        path: 'users',
        loadChildren: () => import('../components/users/users.module').then(m => m.UsersModule),
        canLoad: [
          FireAuthGuard,
          AuthObservableModelObtainedGuard,
          AuthPermissionsGuard
        ],
        canActivate: [
          FireAuthGuard,
          AuthObservableModelObtainedGuard,
          AuthPermissionsGuard
        ],
        data: {
          requiredPermissions: new Array<UserPermission>(UserPermission.USER_MANAGEMENT)
        }
      },
      {
        path: 'login',
        loadChildren: () => import('../components/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('../components/logout/logout.module').then(m => m.LogoutModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
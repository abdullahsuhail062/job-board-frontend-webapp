import { RedirectCommand, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './service/auth-guard.service';
import { Authservice } from './services/authservice';
import { AuthGuardServiceService } from './auth-guard-service-service';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { AdminGuard } from './guards/admin.guard';


export const routes: Routes = [{path: '', component: LandingComponent,canActivate: [AuthGuardService]}, {path: 'signup', component: SignupComponent, canActivate: [AuthGuardService]}, {path: 'signin', component: SigninComponent, canActivate: [AuthGuardService]},{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardServiceService]},{path: 'admin-notification', component: AdminNotificationComponent, canActivate: [AdminGuard]}];

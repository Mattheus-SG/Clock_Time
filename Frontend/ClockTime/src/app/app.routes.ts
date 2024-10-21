import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RecoverPasswordComponent } from './Components/recover-password/recover-password.component';
import { FirstAccessComponent } from './Components/first-access/first-access.component';
import { OptionsAppointmentComponent } from './Components/options-appointment/options-appointment.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotFoundComponent } from './Components/shared/not-found/not-found.component';
import { CameraCaptureComponent } from './Components/capture-camera/capture-camera.component';
import { AdminAreaComponent } from './Components/admin-area/admin-area.component';
import { SavePhotosComponent } from './Components/save-photos/save-photos.component';
import { SetEntryComponent } from './Components/set-entry/set-entry.component';
import { SetOutComponent } from './Components/set-out/set-out.component';
import { ListAppointmentsComponent } from './Components/list-appointments/list-appointments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recuperar', component: RecoverPasswordComponent },
    { path: 'primeiro-acesso', component: FirstAccessComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'marcar-ponto', component: OptionsAppointmentComponent },
    { path: 'dashboard', component: AdminAreaComponent },
    { path: 'save-photos', component: SavePhotosComponent },
    { path: 'set-entry', component: SetEntryComponent },
    { path: 'set-outwork', component: SetOutComponent },
    { path: 'list-appointments', component: ListAppointmentsComponent },
    { path: '**', component: NotFoundComponent }
];

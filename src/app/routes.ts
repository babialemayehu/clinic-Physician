import { Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component'; 
import { UserProfileRouteComponent } from './user-profile-route/user-profile-route.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordRouteComponent } from './change-password-route/change-password-route.component';
import { QueueComponent } from './queue/queue.component'; 
import { VisitsComponent } from './visits/visits.component';
import { RouteComponent as UploadProfile } from './upload_profile_pic/route/route.component'; 
import { LabResponceComponent } from './lab-responce/lab-responce.component';
import { ViewHisstoryComponent } from './view-hisstory/view-hisstory.component';
import { LaboratoryRequestComponent } from './hisstory/laboratory-request/laboratory-request.component';
import { PrescriptionComponent as PrescripitonInHisstory} from './hisstory/prescription/prescription.component';
import { PrescriptionComponent  } from './prescription/prescription.component';

export const appRoutes: Routes = [
    {path: '', component: DashboardComponent },
    {path: 'hisstory/:hisstory_id', component: DashboardComponent }, 
    {path: 'users', component: UsersComponent },
    {path: 'settings', component: SettingsComponent }, 
    //{path: ':worker_id', component: UserProfileRouteComponent}, 
    {path: 'queue', component: QueueComponent },
    {path: 'visits/:reg_id', component: VisitsComponent},
    {path: 'search/:reg_id', component: DashboardComponent}, 
    {path: 'settings/change profile picture', component: UploadProfile },
    {path: 'settings/change password', component: ChangePasswordRouteComponent },
    {path: 'lab/result/:queue_id', component: LabResponceComponent}, 
    {path: 'view/hisstroy/:queue_id', component:ViewHisstoryComponent }, 
    {path: 'lab/request/:queue_id', component: LaboratoryRequestComponent}, 
    {path: 'prescription/prescribe/:queue_id', component: PrescripitonInHisstory}, 
    {path: 'prescription/prescribed/:queue_id', component: PrescriptionComponent}
]; 
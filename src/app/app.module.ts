import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutes } from './routes'; 

import 'materialize-css'; 
import 'string';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'; 

import { MatInputModule} from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FloatingActionBtnComponent } from './floating-action-btn/floating-action-btn.component';
import { RegisterationFormComponent } from './registeration-form/registeration-form.component';
import { HttpClientModule} from "@angular/common/http";
import { AlertComponent } from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { 
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule, 
  MatDialogModule,  
  MatSelectModule, 
  MatAutocompleteModule, 
  MatDatepickerModule,
  MatNativeDateModule,

} from '@angular/material';
import { UsersComponent } from './users/users.component';

// SERVICE PROVIDERS
import { UserService } from './service/user.service';
import { UserTableComponent } from './user-table/user-table.component';

// context menu
import { ContextComponent } from './context/context.component';
// import { ContextMenu } from './context/context.menu';
import { ContextMenuModule } from '../lib/context-menu.module';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal.component';
import { UserProfileRouteComponent } from './user-profile-route/user-profile-route.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordRouteComponent } from './change-password-route/change-password-route.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatinetViewComponent } from './patinet-view/patinet-view.component';
import { RecentVisitsComponent } from './recent-visits/recent-visits.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { QueueMinComponent } from './queue-min/queue-min.component';
import { QueueComponent } from './queue/queue.component';
import { VisitsComponent } from './visits/visits.component';
import { SetupDialogComponent } from './setup-dialog/setup-dialog.component';
import { UploadComponent } from './upload_profile_pic/upload/upload.component';
import { RouteComponent } from './upload_profile_pic/route/route.component';
import { RoomNumberComponent } from './room-number/room-number.component';
import { HistoryFormComponent } from './history-form/history-form.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { LabResponceComponent } from './lab-responce/lab-responce.component';
import { LeftSideComponent } from './left-side/left-side.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    FloatingActionBtnComponent,
    RegisterationFormComponent,
    AlertComponent,
    DashboardComponent,
    UsersComponent,
    UserTableComponent,
    ContextComponent,
    ContextMenuComponent,
    UserProfileComponent,
    UserProfileModalComponent,
    UserProfileRouteComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ChangePasswordRouteComponent,
    PatientSearchComponent,
    PatinetViewComponent,
    RecentVisitsComponent,
    CardTitleComponent,
    QueueMinComponent,
    QueueComponent,
    VisitsComponent,
    SetupDialogComponent,
    UploadComponent,
    RouteComponent,
    RoomNumberComponent,
    HistoryFormComponent,
    LaboratoryComponent,
    PharmacyComponent,
    LabResponceComponent,
    LeftSideComponent,
   
    // ContextMenu,
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatDialogModule, 
    MatSelectModule,
    MatAutocompleteModule,
    ContextMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [
    RegisterationFormComponent, 
    AlertComponent, 
    // ContextMenu, 
    ContextMenuComponent,
    UserProfileModalComponent,
    SetupDialogComponent

  ], 
  providers: [
    UserService, 
  ],
  bootstrap: [AppComponent]
}) 
export class AppModule { }

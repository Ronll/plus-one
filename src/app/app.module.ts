import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ScoresComponent } from './scores/scores.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowService } from './window.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { SearchComponent } from './search/search.component';
import { DbService } from './db.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ScoreComponent } from './score/score.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { 
  MatDialogModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ScoresReasonDialogComponent } from './scores/scores-reason-dialog/scores-reason-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'scores', component: ScoresComponent, canActivate: [AuthGuard] },
  { path: 'scores/:uid', component: ScoreComponent, canActivate: [AuthGuard] },  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ScoresComponent,
    LoginComponent,
    SearchComponent,
    ScoreComponent,
    ScoresReasonDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    WindowService,
    AuthGuard,
    DbService,
    MediaMatcher
  ],
  entryComponents: [ScoresReasonDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

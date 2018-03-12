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
import { FormsModule } from '@angular/forms';
import { WindowService } from './window.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { SearchComponent } from './search/search.component';
import { DbService } from './db.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'scores', component: ScoresComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'history/:userid/', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ScoresComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule
  ],
  providers: [
    WindowService,
    AuthGuard,
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

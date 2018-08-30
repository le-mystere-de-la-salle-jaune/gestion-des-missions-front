import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule,ModalModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { NavigationComponent } from './navigation/navigation.component';
import { GestionMissionsComponent } from './gestion-missions/gestion-missions.component';
import { PlanningMissionsComponent } from './planning-missions/planning-missions.component';
import { PrimesComponent } from './primes/primes.component';
import { SaisieFraisComponent } from './saisie-frais/saisie-frais.component';
import { NatureMissionsComponent } from './nature-missions/nature-missions.component';
import { ValiderMissionsComponent } from './valider-missions/valider-missions.component';
import { EditNatureMissionsComponent } from './edit-nature-missions/edit-nature-missions.component';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]},
  { path:'auth', component: AuthComponent},
  { path: 'gestion-missions', component: GestionMissionsComponent },
  { path: 'planning-missions', component: PlanningMissionsComponent },
  { path: 'primes', component: PrimesComponent},
  { path: 'saisie-frais', component: SaisieFraisComponent },
  { path: 'nature-missions', component: NatureMissionsComponent},
  { path: 'valider-missions', component: ValiderMissionsComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    NavigationComponent,
    GestionMissionsComponent,
    PlanningMissionsComponent,
    PrimesComponent,
    SaisieFraisComponent,
    NatureMissionsComponent,
    ValiderMissionsComponent,
    EditNatureMissionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    CalendarModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './core/services/db/data.service';
import { OwnersComponent } from './core/components/owners/owners.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './core/store/user.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailsModule } from './core/modules/details/details.module';

@NgModule({
  declarations: [
    AppComponent,
    OwnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    NgxsModule.forRoot([
      UserState,
    ], {developmentMode: true}),
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    DetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

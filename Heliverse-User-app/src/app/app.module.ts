import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { MatIconModule } from '@angular/material/icon';
// import { provideAnimations } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    TeamDialogComponent,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports:[
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }

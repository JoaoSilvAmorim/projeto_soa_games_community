import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotFoundComponent } from './modules/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InitialComponent } from './template/initial/initial.component';
import { NavbarComponent } from './template/initial/navbar/navbar.component';
import { FooterComponent } from './template/initial/footer/footer.component';

import { ToastrModule } from 'ngx-toastr';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

/*loottie*/
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ChatComponent } from './modules/chat/chat.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    InitialComponent,
    NavbarComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress', loadingText: 'This item is actually loading...' })
  
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

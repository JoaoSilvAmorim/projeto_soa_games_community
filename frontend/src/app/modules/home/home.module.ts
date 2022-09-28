import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { HomeRoutingModule } from './home.route';
import { LottieModule } from 'ngx-lottie';

import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})
export class HomeModule { }

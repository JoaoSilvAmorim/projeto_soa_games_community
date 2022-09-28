import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';

import { GameRoutingModule } from './game.route';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ViewComponent } from './components/view/view.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    GameComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress', loadingText: 'This item is actually loading...' })
  ]
})
export class GameModule { }

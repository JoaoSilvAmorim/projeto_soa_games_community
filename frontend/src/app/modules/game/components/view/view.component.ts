import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private routeSub?: Subscription;
  private params = {};
  private id!: number | string;
  public game: any = {};

  options: AnimationOptions = {
    path: '/assets/animations/18378-retro-game-loading-animation.json'
  };

  constructor(
    public gameService: GameService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.params = params;
      this.id = params['id'];
    });
  
    this.view(this.id);
  }

  view(id: number | string): void {
    this.gameService.view(id).subscribe(
      response => {
        console.log(response);
        this.game = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}

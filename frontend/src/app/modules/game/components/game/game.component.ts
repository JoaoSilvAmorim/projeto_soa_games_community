import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  
  public games!: any[];
  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.listGames();
  }

  listGames() {
    this.gameService.listGames().subscribe(
      (games: any) => {
        this.games = games;
      },
      (error: any) => {
        console.log('Ocorreu um erro ao tentar listar os jogos', error);
      }
    );
  }

}

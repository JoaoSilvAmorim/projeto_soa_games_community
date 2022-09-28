import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameComponent } from "./components/game/game.component";
import { ViewComponent } from "./components/view/view.component";

const gameRouterConfig: Routes = [
    {path: '', component: GameComponent, pathMatch: 'full'},
    {path: ':id', component: ViewComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(gameRouterConfig)
    ],
    exports: [RouterModule]
})
export class GameRoutingModule { }
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";

const homeRouterConfig: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRouterConfig)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
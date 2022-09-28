import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./component/auth/auth.component";
import { SignupComponent } from "./component/signup/signup.component";

const authRouterConfig: Routes = [
    {path: '', component: AuthComponent, pathMatch: 'full'},
    {path: 'signup', component: SignupComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forChild(authRouterConfig)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
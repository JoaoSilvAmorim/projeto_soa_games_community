import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './modules/chat/chat.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'home', loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'game', loadChildren: ()=> import('./modules/game/game.module').then(m => m.GameModule) },
  { path: 'forum', loadChildren: ()=> import('./modules/forum/forum.module').then(m => m.ForumModule) },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }

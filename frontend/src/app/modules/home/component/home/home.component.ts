import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  options: AnimationOptions = {
    path: '/assets/animations/45740-gaming-community.json'
  };
  constructor() { }

  ngOnInit(): void {
  }
  
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  userLogged (): boolean {
    return this.localStorageUtils.getToken() !== null;
  }


}

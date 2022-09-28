import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  options: AnimationOptions = {
    // size
    path: '/assets/animations/94789-chat-animation.json',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  //set size of animation
  animationCreated(animationItem: AnimationItem): void {
  }

  constructor() { }

  ngOnInit(): void {
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './component/forum/forum.component';
import { ForumRoutingModule } from './forum.route';
import { TopicFormComponent } from './component/topic-form/topic-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicComponent } from './component/topic/topic.component';


@NgModule({
  declarations: [
    ForumComponent,
    TopicFormComponent,
    TopicComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForumModule { }

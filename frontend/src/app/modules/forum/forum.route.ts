import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForumComponent } from "./component/forum/forum.component";
import { TopicFormComponent } from "./component/topic-form/topic-form.component";
import { TopicComponent } from "./component/topic/topic.component";

const forumRouterConfig: Routes = [
    {path: '', component: ForumComponent, pathMatch: 'full'},
    {path: 'form', component: TopicFormComponent},
    {path: ':id', component: TopicComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(forumRouterConfig)
    ],
    exports: [RouterModule]
})
export class ForumRoutingModule { }
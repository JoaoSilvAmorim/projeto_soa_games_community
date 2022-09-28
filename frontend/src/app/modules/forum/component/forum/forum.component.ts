import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public topics!: any[];
  constructor(public forumService: ForumService) { }

  ngOnInit(): void {
    this.listTopics();
  }

  listTopics() {
    this.forumService.listTopics().subscribe(
      (topics: any) => {
        this.topics = topics;
      },
      (error: any) => {
        console.log('Ocorreu um erro ao tentar listar os jogos', error);
      }
    );
  }

}

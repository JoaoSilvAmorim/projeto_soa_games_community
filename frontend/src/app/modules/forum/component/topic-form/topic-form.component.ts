import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generate-form-validation';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  
  errors: any[] = [];
  topicForm!: FormGroup;
  topic: any;
  games!: any[];

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private forumService: ForumService) {
    this.validationMessages = {
      theme: {
        required: "Informe o título",
      },
      question: {
        required: 'Informe o conteúdo',
      },category: {
        required: 'Informe a categoria',
      },gameId: {
        required: 'Informe o jogo',
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.topicForm = this.fb.group({
      theme: ['', [Validators.required]],
      question: ['', [Validators.required]],
      category: ['', [Validators.required]],
      gameId: ['', [Validators.required]]
    });

    this.listGames();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator!.processMessages(this.topicForm);
    })
  }

  listGames() {
    this.forumService.listGames().subscribe(
      (games: any) => { this.games = games
      console.log(this.games) },
      (error: any) => { this.toastr.error('Ocorreu um erro!') }
    );
  }

  createTopic() {
    if (this.topicForm.dirty && this.topicForm.valid) {
      this.topic = Object.assign({}, this.topic, this.topicForm.value);
      console.log(this.topic)
      this.forumService.createTopic(this.topic).subscribe(
        () => { this.processSuccess() },
        (error: any) => { this.processError(error) }
      )
    }
  }

  processSuccess() {
    this.topicForm.reset();
    this.errors = [];
    this.toastr.success('Tópico cadastrado com sucesso!');
    this.router.navigate(['/forum']);
  }

  processError(error: any) {
    this.errors = error.error.errors;
    this.toastr.error('Ocorreu um erro!');
  }

}

import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generate-form-validation';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  
  errors: any[] = [];
  answerForm!: FormGroup;
  topic: any;
  comments!: any[];
  new_answer!: string;
  private routeSub?: Subscription;
  private params = {};
  private id!: number | string;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private forumService: ForumService,
    private route: ActivatedRoute) {
      this.validationMessages = {
      answer: {
        required: "Informe o título",
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.answerForm = this.fb.group({
      answer: ['', [Validators.required]]
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.params = params;
      this.id = params['id'];
    });

    this.getTopic(this.id);
    this.getAnswersByTopic(this.id);
    
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.answerForm);
    });
  }

  getTopic(id: number | string) {
    this.forumService.getTopic(id).subscribe(
      topic => {
        this.topic = topic;
      },
      error => {
        this.toastr.error("Erro ao carregar tópico");
      }
    )
  }

  getAnswersByTopic(id: number | string) {
    this.forumService.getAnswersByTopic(id).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        this.toastr.error("Erro ao carregar comentários");
      }
    )
  }

  
  saveAnswer() {
    if (this.answerForm.dirty && this.answerForm.valid) {
      let data = this.answerForm.value;
      data.topicId = this.id;
      this.forumService.saveAnswer(data).subscribe(
        success => { this.processSuccess(success) },
        error => { this.processFail(error) }
      )
    }
  }
  
  processSuccess(response: any) {
    this.answerForm.reset();
    this.errors = [];
    this.toastr.success("Comentário salvo com sucesso!");
    this.getAnswersByTopic(this.id);
    this.router.navigate(['/forum/', this.id]);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error("Ocorreu um erro!");
  }

}

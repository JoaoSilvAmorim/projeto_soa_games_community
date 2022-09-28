import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generate-form-validation';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  signUpForm!: FormGroup;
  usuario: any;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.validationMessages = {
      name: {
        required: 'Informe o nome',
        minlength: 'O nome deve ter no mínimo 2 caracteres',
        maxlength: 'O nome deve ter no máximo 150 caracteres'
      },
      email: {
        required: "Informe o Email",
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a Senha',
      }, confirmPassword: {
        required: 'Informe a Confirmação de Senha',
        equalTo: 'As senhas não conferem'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator!.processMessages(this.signUpForm);
    })
  }

  signUpUser() {
    if (this.signUpForm.dirty && this.signUpForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.signUpForm.value);

      this.authService.registerUser(this.usuario)
        .subscribe(
          () => { this.processSuccess() },
          error => { this.processFail(error) }
        );
    }
  }

  processSuccess() {
    this.signUpForm.reset();
    this.errors = [];

    this.toastr.success('Cadastro realizado com sucesso!', 'Acesse a sua conta!');
    this.router.navigate(['/auth']);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', fail.error.message);
  }

}

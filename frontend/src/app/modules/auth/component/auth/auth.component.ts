import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generate-form-validation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  loginForm!: FormGroup;
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
      email: {
        required: "Informe o Email",
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a Senha',
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator!.processMessages(this.loginForm);
    })
  }
  
  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.authService.login(this.usuario)
        .subscribe(
          success => { this.success(success) },
          failed => { this.failed(failed) }
        );
    }
  }

  success(response: any) {
    console.log(response);
    this.loginForm.reset();
    this.errors = [];
    this.authService.LocalStorage.saveDataUserLocalStorage(response);
    let toast = this.toastr.success('', 'Login Realizado com Sucesso!');
    if(toast){
      // toast.onHidden.subscribe(()=>{
        this.router.navigate(['/home']);
      // })
    }

  }

  failed(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Opa :( ')
  }

}

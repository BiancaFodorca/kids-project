import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_Form: FormGroup;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private lsService: LocalStorageService
  ) {
    this.login_Form = fb.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {}

  doLogin(values: any): void {
    if (this.login_Form.valid) {
      this.authService.login(values).subscribe(resp => {
        const response = JSON.parse((<any>resp)._body);
        this.lsService.set('uRole', response);
        if (response === 1) {
          this.router.navigate(['/teacher']);
        } else if (response === 2) {
          this.router.navigate(['/student']);
        }
      });
    }
  }
}

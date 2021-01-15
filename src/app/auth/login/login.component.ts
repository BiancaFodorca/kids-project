import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
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
      // this.authService.login(values).subscribe(resp => {
      //   this.lsService.set('uRole', resp._body);
      //   // if (resp._body === '1') {
      //   //   this.router.navigate(['/teacher']);
      //   // } else if ((resp._body = '2')) {
      //   //   this.router.navigate(['/student']);
      //   // }
      // });
    }
  }
}

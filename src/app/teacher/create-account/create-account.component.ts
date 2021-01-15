import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { UsersService } from '../../shared/services/users/users.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  profileForm: FormGroup;
  roles = [{ id: 1, name: 'Profesor' }, { id: 2, name: 'Elev' }];
  selectedRole;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private _service: NotificationsService
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  selectRole(event) {
    this.selectedRole = event.target.value;
  }

  saveProfile() {
    const data = {
      firstname: this.profileForm.get('firstname').value, // this.formGroup.get("firstName").value
      lastname: this.profileForm.get('lastname').value,
      roleId: this.profileForm.get('role').value,
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('password').value,
      confirmPassword: this.profileForm.get('password').value,
      description: this.profileForm.get('description').value
    };
    this.userService.addNewUser(data).subscribe(
      response => {
        console.log('success!');
        this.openNotification('success');
      },
      error => {
        this.openNotification('error');
      }
    );
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Felicitari! :)',
        'Contul a fost creat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ne pare rau! :(',
        'Contul nu a putut fi creat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}

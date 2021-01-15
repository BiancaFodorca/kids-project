import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-teacher',
  templateUrl: './nav-bar-teacher.component.html',
  styleUrls: ['./nav-bar-teacher.component.css']
})
export class NavBarTeacherComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.router.navigate(['/auth/login']);
    this.authService.logout();
  }
}

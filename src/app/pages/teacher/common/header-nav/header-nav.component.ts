import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  nav:boolean = false;

  token: string = '';
  isTeacherAuthenticated = false;
  private authListenerSubs: Subscription | undefined;

  constructor(private teacherAuthService: TeacherAuthService) {}

  ngOnInit(): void {
    this.teacherAuthService.autoAuthTeacher();
    this.isTeacherAuthenticated = this.teacherAuthService.getIsAuth();
    this.authListenerSubs = this.teacherAuthService
      .getAuthStatusListener()
      .subscribe(isTeacherAuthenticated => {
        this.isTeacherAuthenticated = isTeacherAuthenticated;
      });
  }

  hamburgerMenu(isNavOpen: boolean): void {
    this.nav = !isNavOpen;
  }
  onLogout(user: string) {
    if (user === 'teacher') {
      this.teacherAuthService.logout();
    }
  }
  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }

}

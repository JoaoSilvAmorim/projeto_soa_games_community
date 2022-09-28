import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public isMenuCollapsed = true;
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  token: string | null = "";
  user: any;
  company: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  userLogged (): boolean {
    this.token = this.localStorageUtils.getToken();
    this.user = this.localStorageUtils.getUser();

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.clearData();
    this.router.navigate(['/auth']);
  }


}

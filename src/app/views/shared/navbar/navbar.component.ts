import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  isExpanded: boolean = false;
  status: boolean = false;
  exibir: boolean = false;
  exibirDropDownSair: boolean = false;

  constructor(public authService: AuthService) {


  }

  ngOnInit(): void {


  }

  toggle(): void {

  }
}

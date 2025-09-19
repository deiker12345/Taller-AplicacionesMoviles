import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-component',
  templateUrl: './link-component.component.html',
  styleUrls: ['./link-component.component.scss'],
  standalone : false
})
export class LinkComponentComponent  {

  @Input() text!: string;     
  @Input() linkText!: string; 
  @Input() linkTo!: string;   

  constructor(private router: Router) {}

  goToLink() {
    this.router.navigate([this.linkTo]);
  }

}
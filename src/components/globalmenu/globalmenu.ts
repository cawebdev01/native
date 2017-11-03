import { Component } from '@angular/core';

/**
 * Generated class for the GlobalmenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'globalmenu',
  templateUrl: 'globalmenu.html'
})
export class GlobalmenuComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalmenuComponent Component');
    this.text = 'Hello World';
  }

}

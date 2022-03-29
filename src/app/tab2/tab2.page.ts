import { Component } from '@angular/core';
import { ETypeScanner } from '../scanner/scanner.component'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  typeScanner = ETypeScanner.document;
}

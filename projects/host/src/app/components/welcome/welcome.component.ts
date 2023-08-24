import { Component, OnInit } from '@angular/core';
import { SharedLibService } from 'shared-lib';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private _sharedLib: SharedLibService) {}

  ngOnInit(): void {
    console.log(this._sharedLib.dummyUUID);
  }
}

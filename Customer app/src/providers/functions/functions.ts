import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the Function provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Functions {

  constructor(public alert: AlertController, public translate: TranslateService) {

  }
  
  showAlert(title, subTitle){
    let alert = this.alert.create({
      title: title,
      subTitle: subTitle,
      buttons: [this.translate.instant('KEY12')]
    });

    alert.present(alert);
  } 
}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { environment } from '@env/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
// import {Http} from '@angular/common/http';
@Injectable()
export class FoodmenuService {

  constructor(private http: HttpClient) { }


  public getMenuForDay(day: string, menutype: string): any {
    let dayState = day;
    let menutypeState = menutype;
    return this.http.get('assets/menu_plan.json').mergeMap((response) => {
      // const resp = response['cw24'][day.toLowerCase()];
      let resp;
      if (menutypeState != null && menutypeState.length > 0)
      {
        resp = {};
        resp[menutypeState] = response['cw24'][dayState.toLowerCase()][menutype.toLowerCase()]
      }
      else
      {
        resp = "";
        resp = response['cw24'][dayState.toLowerCase()];
      }
      const values = Object.values(resp);

      const obs = [];

      for (const value of values) {
        obs.push(this.getMealForId(value));
      }

      return Observable.forkJoin(obs);
    });
  }

  private getMealForId(id: string): any {
    return this.http.get('assets/menu_plan.json').map(response => {
      return response['meals'][id];
    });
  }
}

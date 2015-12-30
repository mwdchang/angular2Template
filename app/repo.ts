import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

@Component({
   selector: 'repo',
   template: `
      <div class="repo">
        Github User: <input [value]="userName" (input)="update($event.target.value)" placeholder="e.g. mwdchang"/>
        <div *ngIf="userRepos">
          <ul>
             <li *ngFor="#repo of userRepos">
             {{repo.name}}
             </li>
          </ul>
        </div>
        <div *ngIf="!userRepos">
        -- No Repos
        </div>
      </div>
   `
})
export class Repo {
   private userName:string = '';
   private userRepos:Object[];
   private http:Http;
   private timer;

   constructor(http: Http) {
      this.http = http;
      console.log('http', this.http);
   }

   update(v:string):void {
      this.userName = v;
      if (this.userName.length === 0) {
         this.userRepos = undefined;
         return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.updateRepo(), 500);
   }

   updateRepo():void {
      let url = 'https://api.github.com/users/' + this.userName + '/repos';
      this.http.get(url)
        .subscribe(
           res => {
             this.userRepos = res.json();
             if (this.userRepos.length === 0) {
                this.userRepos = undefined;
             }
          },
          err => {
             this.userRepos = undefined;
          }
        );
   }
};

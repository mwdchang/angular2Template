import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Repo} from "./repo";

@Component({
   selector: 'my-app',
   directives: [Repo],
   templateUrl: 'views/home.html'
})
export class MyApp {
   welcomeMessage:string = "Test angular 2 application !!!";
};


bootstrap(MyApp, [HTTP_PROVIDERS]);

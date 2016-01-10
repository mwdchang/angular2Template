/// <reference path='../typings/tsd.d.ts' />

import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {Repo} from "./repo";
import {StartComponent} from "./start";
import {View2Component} from "./view2";


@RouteConfig([
   {
      path: '/',
      name: 'Start',
      component: StartComponent,
      useAsDefault: true
   },
   {
      path: '/view2',
      name: 'View2',
      component: View2Component,
   }
])

@Component({
   selector: 'my-app',
   directives: [Repo, ROUTER_DIRECTIVES],
   templateUrl: 'views/home.html'
})
export class MyApp {
   welcomeMessage:string = "Test angular 2 application !!!";

   constructor() {
   }
};

bootstrap(MyApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: PathLocationStrategy})]);

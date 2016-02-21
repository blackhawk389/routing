import { Component, provide } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES } from 'angular2/router';
import { LocationStrategy, HashLocationStrategy, ROUTER_PROVIDERS } from 'angular2/router';
import { bootstrap } from 'angular2/platform/browser';
import { parent } from './components/todocomponent/towebcomponent';
import { second } from './components/wecomponent/wetodocomponent';

@Component({
    
    selector : 'app',
    template : `<h1>WHOLE NEW TODO APP</h1>
        <span><a [routerLink] = "['/Todo']">Todos</a></span>
        <span><a [routerLink] = "['/Wtodo']">Weekly Todos</a></span>
        
        <router-outlet></router-outlet>
    `,
    directives : [ROUTER_DIRECTIVES, RouterLink, RouterOutlet]
    
})
@RouteConfig([
    {path : '/todo', name: 'Todo', component : parent },
    {path : '/wtodo', name: 'Wtodo', component : second }
])
export class main{
    
}
bootstrap(main, [ROUTER_PROVIDERS, 
provide(LocationStrategy, {useClass: HashLocationStrategy})] );
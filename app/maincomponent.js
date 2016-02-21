System.register(['angular2/core', 'angular2/router', 'angular2/platform/browser', './components/todocomponent/towebcomponent', './components/wecomponent/wetodocomponent'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_2, browser_1, towebcomponent_1, wetodocomponent_1;
    var main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (towebcomponent_1_1) {
                towebcomponent_1 = towebcomponent_1_1;
            },
            function (wetodocomponent_1_1) {
                wetodocomponent_1 = wetodocomponent_1_1;
            }],
        execute: function() {
            main = (function () {
                function main() {
                }
                main = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "<h1>WHOLE NEW TODO APP</h1>\n        <span><a [routerLink] = \"['/Todo']\">Todos</a></span>\n        <span><a [routerLink] = \"['/Wtodo']\">Weekly Todos</a></span>\n        \n        <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, router_1.RouterOutlet]
                    }),
                    router_1.RouteConfig([
                        { path: '/todo', name: 'Todo', component: towebcomponent_1.parent },
                        { path: '/wtodo', name: 'Wtodo', component: wetodocomponent_1.second }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], main);
                return main;
            })();
            exports_1("main", main);
            browser_1.bootstrap(main, [router_2.ROUTER_PROVIDERS,
                core_1.provide(router_2.LocationStrategy, { useClass: router_2.HashLocationStrategy })]);
        }
    }
});
//# sourceMappingURL=maincomponent.js.map
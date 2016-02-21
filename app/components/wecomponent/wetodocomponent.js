System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var first, second;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //import { Headers, Http, Response, RequestOptions, HTTP_PROVIDERS } from 'angular2/http';
            //can we convert comunicate b/w routes?
            first = (function () {
                function first() {
                    this.isupdate = false;
                    //initializing event 
                    this.deletevent = new core_1.EventEmitter();
                }
                first.prototype.delete = function (deleteid) {
                    //emiting event
                    this.deletevent.emit(deleteid);
                };
                first.prototype.update = function () {
                    this.isupdate = true;
                };
                first.prototype.save = function (updateobject) {
                    this.isupdate = false;
                    this.updatevent.emit(updateobject);
                };
                first = __decorate([
                    core_1.Component({
                        selector: 'first',
                        template: "\n    \n    <div>\n    <span *ngIf = \"!isupdate\" >{{weeklytasks.task}}</span><input *ngIf = \"isupdate\" [(ngModel)] = \"weeklytasks.task\" />\n    <span *ngIf = \"!isupdate\" >{{weeklytasks.day}}</span><input *ngIf = \"isupdate\" [(ngModel)] = \"weeklytasks.day\" />\n    <button type = \"button\" (click) = \"delete(weeklytasks.id)\">Delete</button>\n    <button *ngIf = \"isupdate\" type = \"button\" (click) = \"update()\">Update</button>\n    <button *ngIf = \"isupdate\" type = \"button\" (click) = \"save(weeklytasks)\">Save</button> \n    </div>\n    \n    ",
                        inputs: ['weeklytasks'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], first);
                return first;
            })();
            exports_1("first", first);
            second = (function () {
                //dependency injection of http, what the heck wearray creats as soon as class is constructed
                function second() {
                    this.wearray = [];
                }
                second.prototype.addweeklytask = function (tasks, day) {
                    this.task = tasks.value;
                    this.days = day.value;
                    this.id = Date.now();
                    var obj = {
                        task: this.task,
                        day: this.days,
                        id: this.id
                    };
                    console.log('obj', obj);
                    this.wearray.push(obj); //for front end
                    console.log('this.wearray', this.wearray);
                };
                second.prototype.deletemethod = function (deleteid) {
                    //match in existing array and splice, it will totly front end thing
                    console.log('deleted');
                };
                second.prototype.updatefromarray = function (updateobject) {
                    console.log('updated');
                };
                second = __decorate([
                    core_1.Component({
                        selector: 'second',
                        template: "\n    \n    <div> \n    <input #wtask method = 'post'>\n    <input #day method = 'post'>\n    <button type = 'submit' (click) = 'addweeklytask(wtask, day)'>Add A Weekly Task </button>   \n    </div>\n    <first *ngFor = \"#weto of wearray\" [weeklytasks] = \"weto\" (deletevent) = \"deletemethod($event)\" (updatevent) = \"updatefromarray($event)\" >Loading...</first>\n    \n    ", directives: [first],
                    }), 
                    __metadata('design:paramtypes', [])
                ], second);
                return second;
            })();
            exports_1("second", second);
        }
    }
});
//# sourceMappingURL=wetodocomponent.js.map
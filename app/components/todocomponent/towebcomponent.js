//eventemitter will be used as 
System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var child, parent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            //child component
            //the data will be sent to child to parent
            //parent to child data was sent input and output
            //child to parent sent through events
            child = (function () {
                //array : any[];
                // constructor(task : string, detail : string, id : number){
                //     this.task = task;
                //     this.detals = detail;
                //     this.id = id;
                // }
                function child() {
                    this.editMode = false;
                    this.childevent = new core_1.EventEmitter();
                    this.updatevent = new core_1.EventEmitter();
                }
                // ngOnInit(){
                //     this.task = this.taskobject.task;
                //     this.detals = this.taskobject.detail;
                //     this.id = this.taskobject.id;
                // }
                //send only specific value 
                child.prototype.deletetask = function (deletingobjectid) {
                    console.log('inside child delete');
                    console.log(deletingobjectid);
                    // taskobject.isDelete = true;
                    this.childevent.emit(deletingobjectid);
                };
                child.prototype.updatetask = function () {
                    this.editMode = true;
                };
                child.prototype.savetask = function (updatingobj) {
                    this.editMode = false;
                    console.log('Im from savetask function');
                    console.log(updatingobj);
                    console.log('I have data');
                    this.updatevent.emit(updatingobj);
                };
                child = __decorate([
                    core_1.Component({
                        selector: 'child-component',
                        inputs: ['taskobject'],
                        outputs: ['childevent', 'updatevent'],
                        //outputs : ['objectsend'],
                        template: "<div>\n      \n      <span *ngIf=\"!editMode\">{{taskobject.taskobj}}</span><input *ngIf=\"editMode\" [(ngModel)]=\"taskobject.taskobj\" />\n      <span *ngIf=\"!editMode\">{{taskobject.detailobj}}</span><input *ngIf=\"editMode\" [(ngModel)]=\"taskobject.detailobj\" />\n      <button type = \"button\" class = \"btn btn-default\" (click) = \"deletetask(taskobject._id)\">Delete</button>\n      <button *ngIf=\"!editMode\" type = \"button\" class = \"btn btn-defualt\" (click) = \"updatetask()\">Update</button>\n      <button *ngIf=\"editMode\" type = \"button\" class = \"btn btn-defualt\" (click) = \"savetask(taskobject)\">Save</button>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], child);
                return child;
            })();
            exports_1("child", child);
            //parent ccomponent, compoent is like teaching new tags to the browser.
            //its a functional unit of the page
            parent = (function () {
                //http : Http;
                //fromserver : any[];
                function parent(http) {
                    this.http = http;
                    this.array = [];
                    //this.fromserver = []
                }
                parent.prototype.deleteparent = function (taskobject) {
                    var _this = this;
                    console.log("inside parent " + taskobject);
                    this.http.delete("http://localhost:3000/deletedata/" + taskobject).subscribe(function (res) {
                        console.log(res.json());
                        _this.array = res.json();
                    });
                };
                parent.prototype.updateparent = function (value) {
                    console.log("hey im id " + value._id);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var opts = new http_1.RequestOptions();
                    opts.headers = headers;
                    this.http.post('http://localhost:3000/edit', JSON.stringify(value), opts).subscribe(function (res) {
                        console.log(res.json());
                    });
                    //    )        
                    // if(value.isDelete){
                    //     console.log(value);
                    //     for(var i = 0; i < this.array.length ; i++){
                    //     console.log('inside for');
                    //     if(value == this.array[i].idobj){
                    //         this.array.splice(i, 1);
                    //         console.log("inside if");
                    //         break;    
                    //     }
                    //     console.log('delete ended')
                    //     }
                    // }  else {
                    console.log(value);
                    console.log("Updated");
                    //}
                };
                // updateparent(value){
                //     for(var i = 0; i < this.array.length ; i++){
                //     console.log('inside for');
                //     if(value == this.array[i].idobj){
                //         break;    
                //     }
                // }
                // }
                // constructor(){
                //     //i want this to initialize asa parent create
                //     this.Arrayobj= [];
                //     this.objectarray = {};
                // }
                parent.prototype.addtask = function (task, detail) {
                    var _this = this;
                    // this.taskobj.task= task.value;
                    // this.taskobj.details = detail.value;
                    // this.id = Date.now();
                    console.log('in add task');
                    // this.array.push();
                    //this.Arrayobj.push(new child(task.value, detail.value, this.id ));
                    // this.objectarray = task.value;
                    // this.objectarray = detail.value;
                    // this.objectarray = this.id;
                    // this.objectarray = this.Arrayobj.push(this.objectarray);
                    // console.log(this.objectarray);
                    this.task = task.value;
                    this.detals = detail.value;
                    var obj = {
                        taskobj: this.task,
                        detailobj: this.detals,
                    };
                    //console.log(obj);
                    task.value = '';
                    detail.value = '';
                    var header = new http_1.Headers();
                    header.append('Content-Type', 'application/json');
                    var requestOption = new http_1.RequestOptions();
                    requestOption.headers = header;
                    this.http.post('http://localhost:3000/addtaskserver', JSON.stringify(obj), requestOption)
                        .subscribe(function (res) {
                        console.log(res.json());
                        //this.fromserver = res.json();
                        _this.array = res.json();
                    });
                };
                parent = __decorate([
                    core_1.Component({
                        selector: 'parent-component',
                        directives: [child],
                        //inputs :['objectrecievedfromchild'],
                        template: "\n    <h1 class= \"text-center\">ToDo App</h1>\n    <div class = \"form-group\">\n    <lable>Task</lable>\n    <input name = \"tasks\" #task class = \"form-control\" method = 'post' >\n    <lable>Detail</lable>\n    <input type = \"text\" name = \"taskdetail\" #detail class = \"form-control\" method = 'post' >\n    <button type = \"submit\" class  = \"btn btn-default\" (click) = \"addtask(task, detail)\">Add Task</button>\n    <child-component *ngFor = \"#todo of array\" [taskobject] = \"todo\" (childevent) = \"deleteparent($event)\"  (updatevent) = \"updateparent($event)\">Loading...</child-component>\n    \n    </div>\n    \n    \n    \n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], parent);
                return parent;
            })();
            exports_1("parent", parent);
        }
    }
});
//bootstrap(parent, [HTTP_PROVIDERS]); 
//# sourceMappingURL=towebcomponent.js.map
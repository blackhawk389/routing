//eventemitter will be used as 

import { Component, EventEmitter } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { HTTP_PROVIDERS } from 'angular2/http';


//child component
//the data will be sent to child to parent
//parent to child data was sent input and output
//child to parent sent through events
@Component({
    
    selector : 'child-component',
    inputs : ['taskobject'],
    outputs : ['childevent', 'updatevent'],
    //outputs : ['objectsend'],
    template : `<div>
      
      <span *ngIf="!editMode">{{taskobject.taskobj}}</span><input *ngIf="editMode" [(ngModel)]="taskobject.taskobj" />
      <span *ngIf="!editMode">{{taskobject.detailobj}}</span><input *ngIf="editMode" [(ngModel)]="taskobject.detailobj" />
      <button type = "button" class = "btn btn-default" (click) = "deletetask(taskobject._id)">Delete</button>
      <button *ngIf="!editMode" type = "button" class = "btn btn-defualt" (click) = "updatetask()">Update</button>
      <button *ngIf="editMode" type = "button" class = "btn btn-defualt" (click) = "savetask(taskobject)">Save</button>
    </div>
    `
})
export class child{
    
    editMode = false;
        
    
    //we are creating a instance just as configured as child component 
    // task : string;
    // detals : string;
    // id : number;
    
    
    childevent : EventEmitter<any>;
    updatevent : EventEmitter<any>;
  
    //array : any[];
    
    // constructor(task : string, detail : string, id : number){
    //     this.task = task;
    //     this.detals = detail;
    //     this.id = id;
    // }
    constructor(){
        this.childevent = new EventEmitter();
        this.updatevent = new EventEmitter();
    }
    
    // ngOnInit(){
    //     this.task = this.taskobject.task;
    //     this.detals = this.taskobject.detail;
    //     this.id = this.taskobject.id;
    // }
    
    
    //send only specific value 
    deletetask(deletingobjectid){
        console.log('inside child delete');
        console.log(deletingobjectid);
       // taskobject.isDelete = true;
        this.childevent.emit(deletingobjectid);
    }
    
    updatetask(){
        this.editMode = true;
    }
    savetask(updatingobj){
        this.editMode = false;
        console.log('Im from savetask function');
        console.log(updatingobj);
        console.log('I have data')
        this.updatevent.emit(updatingobj);
        
    }
}




//parent ccomponent, compoent is like teaching new tags to the browser.
//its a functional unit of the page
@Component({
    selector : 'parent-component',
    directives : [child],
    //inputs :['objectrecievedfromchild'],
    template : `
    <h1 class= "text-center">ToDo App</h1>
    <div class = "form-group">
    <lable>Task</lable>
    <input name = "tasks" #task class = "form-control" method = 'post' >
    <lable>Detail</lable>
    <input type = "text" name = "taskdetail" #detail class = "form-control" method = 'post' >
    <button type = "submit" class  = "btn btn-default" (click) = "addtask(task, detail)">Add Task</button>
    <child-component *ngFor = "#todo of array" [taskobject] = "todo" (childevent) = "deleteparent($event)"  (updatevent) = "updateparent($event)">Loading...</child-component>
    
    </div>
    
    
    
    `
})
export class parent{
    //taskobj : {task : string, details : string, id:  number};
    // Arrayobj : any[];
    // objectarray = {};
    
    comingeventdelete ;
    task : string;
    detals : string ;
    id : number;
    array : any[];
    //http : Http;
    //fromserver : any[];
    
    
    
    constructor(private http :Http){
        this.array = [];
        //this.fromserver = []
    }
    
    deleteparent(taskobject){
        console.log("inside parent "+taskobject);
        this.http.delete("http://localhost:3000/deletedata/" +taskobject).subscribe((res : Response) => {
            console.log(res.json());
            this.array = res.json();
        })     
    }
    
    updateparent(value){
        
        
        console.log("hey im id "+value._id);
          let headers: Headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let opts: RequestOptions = new RequestOptions();
            opts.headers = headers;
        
        this.http.post('http://localhost:3000/edit' ,JSON.stringify(value), opts).subscribe(
           (res :Response)=>{
               console.log(res.json())
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
            console.log("Updated")
        //}
    }
    
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
    
    addtask(task : HTMLInputElement, detail : HTMLInputElement){
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
        
        this.task =  task.value;
        this.detals =  detail.value;
        
        var obj = {
            taskobj : this.task,
            detailobj : this.detals,
            //idobj : this.id
        }
        //console.log(obj);
        task.value = '';
        detail.value = '';  
        
        var header : Headers = new Headers();
        header.append('Content-Type', 'application/json');
        var requestOption : RequestOptions = new RequestOptions();
        
        requestOption.headers = header;
        
        this.http.post('http://localhost:3000/addtaskserver', JSON.stringify(obj), requestOption)
                 .subscribe((res : Response) =>{
                     console.log(res.json());
                         //this.fromserver = res.json();
                           this.array = res.json();
        })            
                 
    }
    
    
    }
    
//bootstrap(parent, [HTTP_PROVIDERS]);
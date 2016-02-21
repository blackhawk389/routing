import { Component, provide, EventEmitter } from 'angular2/core';
//import { Headers, Http, Response, RequestOptions, HTTP_PROVIDERS } from 'angular2/http';
//can we convert comunicate b/w routes?

@Component({
    
    selector : 'first',
    template : `
    
    <div>
    <span *ngIf = "!isupdate" >{{weeklytasks.task}}</span><input *ngIf = "isupdate" [(ngModel)] = "weeklytasks.task" />
    <span *ngIf = "!isupdate" >{{weeklytasks.day}}</span><input *ngIf = "isupdate" [(ngModel)] = "weeklytasks.day" />
    <button type = "button" (click) = "delete(weeklytasks.id)">Delete</button>
    <button *ngIf = "isupdate" type = "button" (click) = "update()">Update</button>
    <button *ngIf = "isupdate" type = "button" (click) = "save(weeklytasks)">Save</button> 
    </div>
    
    `
    , 
    inputs : ['weeklytasks'],
    //  outputs : ['deletevent', 'updatevent']
})
export class first{
    
    //create an event
    deletevent : EventEmitter<any>;
    updatevent : EventEmitter<any>;
    isupdate : boolean = false;
    
    constructor(){
        //initializing event 
        this.deletevent = new EventEmitter();
    }
    delete(deleteid){
        //emiting event
        this.deletevent.emit(deleteid);
    }
    update(){
        this.isupdate = true ;   
    }
    save(updateobject){
        this.isupdate = false;
        this.updatevent.emit(updateobject);
    }
}

@Component({
    selector : 'second',
    template : `
    
    <div> 
    <input #wtask method = 'post'>
    <input #day method = 'post'>
    <button type = 'submit' (click) = 'addweeklytask(wtask, day)'>Add A Weekly Task </button>   
    </div>
    <first *ngFor = "#weto of wearray" [weeklytasks] = "weto" (deletevent) = "deletemethod($event)" (updatevent) = "updatefromarray($event)" >Loading...</first>
    
    `, directives : [first],
})
export class second{
    //must be class level variables
    task : string;
    days : string;
    id : number;
    wearray : any[];
    
    //dependency injection of http, what the heck wearray creats as soon as class is constructed
    constructor(){
        this.wearray = [];
    }
       
    addweeklytask(tasks : HTMLInputElement, day : HTMLInputElement){
         this.task = tasks.value;
         this.days = day.value;
         this.id = Date.now()
        
        var obj = {
            task : this.task,
            day : this.days,
            id : this.id
        }
        console.log('obj', obj)
           
        this.wearray.push(obj); //for front end
        console.log('this.wearray', this.wearray)
    }
    
    deletemethod(deleteid){
        //match in existing array and splice, it will totly front end thing
        console.log('deleted')
    }
    updatefromarray(updateobject){
        console.log('updated')
    }
    
}
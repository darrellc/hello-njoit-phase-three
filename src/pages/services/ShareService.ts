//This is almost like a session.
//Each variable you want to save can be passed along through pages and changed.
import { Subject } from 'rxjs/Subject';

export class ShareService{
     
    dates: any[];
    monthNames: any[];
    show: {};     
    updateScreen = new Subject<any[]>();
    events: {};
    loader;
    
    constructor(){
        this.dates = [];
        this.monthNames = ["january", "february", "march", "april", "may",
                           "june", "july", "august", "september", "october",
                           "november", "december"];
        this.show = {};
        this.show["show-holidays"] = true;
        this.show["show-pay"] = false;
        this.show["show-due"] = false;

        this.events = {};
        for(var m in this.monthNames){
            this.events[this.monthNames[m]] = {};
        }  
    }
    //Assign the holidays array of objects to the value of holidays;
    setDates(dates){
        this.dates = dates;
    }
    //Assign showHolidays to either true or false;
    setShow(key, value){
        this.show[key] = value;
    }

    setLoader(loader){
        this.loader = loader;
    }

    addEvent(monthName, type, event){
        if (!(monthName in this.events)) {
            this.events[monthName] = {};
        }
        
        if(!this.events[monthName][type]){
            this.events[monthName][type] = [event];
        }else{
            this.events[monthName][type].push(event);
        }        
    }

    getEvents(){
        return this.events;
    }

    getMonthEvents(month){
        var e = [];
        //Get the entire month events object.
        var events = this.events[month];

        if(this.getShow('show-holidays') && events['holidays']){
            e = e.concat(events['holidays']);
        }
        if(this.getShow('show-pay') && events['pay-dates']){
            e = e.concat(events['pay-dates'])
        }
        if(this.getShow('show-due') && events['due-dates']){
            e = e.concat(events['due-dates']);
        }
        return e;
    }

    getMonthEventsByType(monthName, eventType){
        //Take the monthName and prepend month-
        return this.events[monthName][eventType];
    }
    //Return showHolidays boolean;
    getShow(key){
        return this.show[key];
    }    
    //Return the holidays array of objects;
    getHolidays(){
        return this.dates;
    }
    //Return the monthNames array;
    getMonthNames(){
        return this.monthNames;
    }
    //Return the name of the month with the given idx;
    getMonth(idx){
        return (this.monthNames[idx]) ? this.monthNames[idx] : "Not Found";
    }

    getDatesPerMonth(month){
        return (this.dates[month]) ? this.dates[month] : [];
    }

    //Return the show object
    getShowObject(){
        return this.show;
    }    
}


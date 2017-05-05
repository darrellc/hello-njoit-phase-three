//This is almost like a session.
//Each variable you want to save can be passed along through pages and changed.

export class ShareService{
     
    dates: any[];
    monthNames: any[];

    showHolidays: boolean;
    showPayDates: boolean;
    showDueDates: boolean;
    
    constructor(){
        this.dates = [];
        this.monthNames = ["January", "February", "March", "April", "May",
                           "June", "July", "August", "September", "October",
                           "November", "December"];
        this.showHolidays = true;
        this.showPayDates = false;
        this.showDueDates = false;
    }
    //Assign the holidays array of objects to the value of holidays;
    setDates(dates){
        this.dates = dates;
    }
    //Assign showHolidays to either true or false;
    setShowHolidays(showHolidays){
        this.showHolidays = showHolidays
    }
    //Assign showHolidays to either true or false;
    setShowPayDates(showPayDates){
        this.showHolidays = showPayDates;
    }
    //Assign showHolidays to either true or false;
    setShowDueDates(showDueDates){
        this.showHolidays = showDueDates;
    }
    //Return showHolidays boolean;
    getShowHolidays(){
        return this.showHolidays;
    }    
    //Return showPayDates boolean;
    getShowPayDates(){
        return this.showPayDates;
    }    
    //Return showDueDates boolean;
    getShowDueDates(){
        return this.showDueDates;
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

    getEvents(monthName, idx){
        var events = [];
        //Get the holidays
        events = events.concat(this.getHolidayItems(monthName, idx));
        //Get the pay dates
        events = events.concat(this.getPayDates(monthName, idx));
        //Get the due dates
        events = events.concat(this.getDueDates(monthName, idx));

        console.log("EVENTS: ", events);
        return events;
    }

    //monthName is the name of the month to get the holidays.
    getHolidayItems(monthName, idx){
        var events = [];
        var holidays = this.getDatesPerMonth(monthName);
        //Get the events for the given month
        if(holidays.length > 0){
            //Loop through each holiday in the holidays array
            //Represented by "h"
            for(let h of holidays){
                //Get the holiday date and split by "/"
                var dateParts = h.dateAnno.split("/");
                //Get the start and end time of the holiday. Make sure to convert to UTC time.
                //sTime will be the starting day UTC time.
                //eTime will be the ending day UTC time - sTime day + 1
                var sTime = new Date(Date.UTC(dateParts[2],idx,dateParts[1]));
                var eTime = new Date(Date.UTC(dateParts[2],idx, parseInt(dateParts[1])+1));

                //Create the event for the calendar view and add it to the events array.
                events.push({
                    title: h.holiday,
                    startTime: sTime,
                    endTime: eTime,
                    allDay: true,
                    eventType:"monthview-holiday"
                });
            }
        }
        return events;
    }

    getPayDates(monthName, idx){
        var events = [];
        var startDate = new Date(new Date().getFullYear(), 1, 12);
        console.log(startDate);


        return events;
    }

    getDueDates(monthName, idx){
        var events = [];

        return events;
    }
}


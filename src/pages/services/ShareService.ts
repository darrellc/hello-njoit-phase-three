//This is almost like a session.
//Each variable you want to save can be passed along through pages and changed.

export class ShareService{
     
    holidays: any[];
    monthNames: any[];

    constructor(){
        this.holidays = [];
        this.monthNames = ["January", "February", "March", "April", "May",
                           "June", "July", "August", "September", "October",
                           "November", "December"];
    }
    //Assign the holidays array of objects to the value of holidays;
    setHolidays(holidays){
        this.holidays = holidays;
    }
    //Return the holidays array of objects;
    getHolidays(){
        return this.holidays;
    }
    //Return the monthNames array;
    getMonthNames(){
        return this.monthNames;
    }
    //Return the name of the month with the given idx;
    getMonth(idx){
        return (this.monthNames[idx]) ? this.monthNames[idx] : "Not Found";
    }

    getHolidaysPerMonth(month){
        return (this.holidays[month]) ? this.holidays[month] : [];
    }

    getEvents(monthName, idx){
        var events = [];
        //Get the holidays
        events = events.concat(this.getHolidayItems(monthName, idx));
        //Get the pay dates
        events = events.concat(this.getPayDates());
        //Get the due dates
        events = events.concat(this.getDueDates());

        console.log("EVENTS: ", events);
        return events;
    }

    //monthName is the name of the month to get the holidays.
    getHolidayItems(monthName, idx){
        var events = [];
        var holidays = this.getHolidaysPerMonth(monthName);
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

    getPayDates(){
        var events = [];

        return events;
    }

    getDueDates(){
        var events = [];

        return events;
    }
}


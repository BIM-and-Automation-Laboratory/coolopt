export function currentDay() {
    var dayOptions = {  
        weekday: 'long', 
        hour12: false 
    };
    var dayToday = new Date().toLocaleDateString('en-us', dayOptions);
    return dayToday
  }

export function currentDate() {
    var dateOptions = {   
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour12: false 
    };
    var dateToday = new Date().toLocaleDateString('en-us', dateOptions);
    return dateToday
}

// OTHER HELPER FUNCTIONS HERE

import { combineReducers } from 'redux';

export const initialState = {
  tripData: {
    tripDates:{
      startDate: null,
      endDate: null,
      pages: []
    },
    entries: [],
    currentPage: 0
  },
  purchaseData: {}
}
/*--------------------- REDUCERS---------------_*/
const tripDates = (state = initialState.tripData.tripDates, action) => {
  switch (action.type) {
    case "SET_DATES":
      let count=0;
      let pages = [];
      let startDate = new Date(action.startDate);
      let endDate = new Date(action.endDate);
        while(startDate<=endDate){
          pages.push({
            pageNumber: count,
            date: startDate
          });
          startDate.setDate(startDate.getDate() + 1);
          count++;
        }
        return Object.assign({},state,{
            startDate : action.startDate,
            endDate : action.endDate,
            pages: pages
        });
    default:
      return state;
  }
}
const entries = (state = [], action) => {
  switch(action.type){

    case "ADD_ENTRY":
        createTripExpense(action.data);
        return [...state, action.data];

    case "EDIT_ENTRY":
        let newState = state.map((entry,i)=>{
          if(i===action.page){
            return action.data;
          }else{
            return entry;
          }
        });
        return newState;

    default:
      return state;
  }
}
const currentPage = (state = 0, action) => {
  switch (action.type) {
    case 'GO_TO_PAGE':
      return action.page
    case 'GO_TO_NEXT_PAGE':
      if(state+1 === tripDates(undefined,action).pages.length){
        return state;
      }else{
        return state+1;
      }
    default:
      return state;
  }
};

const formCompleted = (state = false, action) => {
  switch(action.type){
    case 'FORM_COMPLETED':
      return true;
    case 'FORM_INCOMPLETE':
      return false;
    default:
      return state;
  }
};

const expensesApp = combineReducers({
  tripDates,
  entries,
  currentPage
  //formCompleted
});


/*---------------------- Action creators -------------*/
const setDates = (startDate,endDate) => {
  return {
    type: 'SET_DATES',
    startDate,
    endDate
  }
};

const setCurrentPage = (page) => {
  console.log("SET");
  return {
    type: 'GO_TO_PAGE',
    page
  }
};
const nextPage = () => {
  console.log("NEXT");
  return {
    type: 'GO_TO_NEXT_PAGE'
  }
};

const addEntry = (data,page) => {
  //todo----
  return {
    type: 'ADD_ENTRY',
    data
  }
};

export {expensesApp, setDates, setCurrentPage, nextPage, addEntry};

/*------------------- AJAX Calls ------------------------*/
const createTripExpense = (trip) => {
    let saveTrip = new Promise(function(resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/api/expenses',true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload = function(){
      if(xhr.status ==200){
        resolve(JSON.parse(xhr.response));
      }else{
        reject(JSON.parse(xhr.response));
      }
    };
    xhr.onerror = function() {
        reject(Error("Network Error"));
    };
    xhr.send(JSON.stringify(trip));
  });
  saveTrip.then(function(response){
      alert('save successful');
  },function(error){
      alert(error.message)
  });
}

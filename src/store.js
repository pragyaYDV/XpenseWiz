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
  purchases: null
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
            page: count,
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
    console.log("returning default");
      return state;
  }
}
const entries = (state = [], action) => {
  switch(action.type){
    case "ADD_ENTRY":
      if(currentPage == state.length)
        return [...state, action.details];
      else{
        return state.map((cur,i) => {
          if(i==currentPage){
            return action.details;
          }
        });
      }
    default:
    return state;
  }
}
const currentPage = (state = 0, action) => {
  switch (action.type) {
    case 'GO_TO_PAGE':
      return action.page
    default:
      return state;
  }
};

const expensesApp = combineReducers({
  tripDates,
  entries,
  currentPage
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
  return {
    type: 'GO_TO_PAGE',
    page
  }
};

export {expensesApp, setDates};

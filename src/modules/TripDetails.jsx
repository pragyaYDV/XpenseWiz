import React from 'react';
import './../less/trip-details.less';
import { setCurrentPage,addEntry ,nextPage} from '../store.js';
import {connect} from  'react-redux';
import {withRouter} from 'react-router-dom';
import {DateManager} from '../Utils.js';


const BreadCrumb = ({pages, currentPage, changePage}) => {
  return (
    <div className="bread-crumbs">
      {pages.map((page) => {
        return (
          <button key ={"page"+page.pageNumber} onClick={() => changePage(page.pageNumber)} className={page.pageNumber == currentPage? 'current': ''}>
            {DateManager.formatDate(page.date)}
          </button>);
      })}
    </div>
  );
}

const TripForm = ({entry, saveAndNext})=>{
  let el = {};
  return (
    <form>
      <div>
        <h3>Trasport</h3>
        <label>Type</label>
        <select name="trasportType" ref={input => el.trasportType = input} >
          <option value="">Select</option>
          <option value="air">Air Transport</option>
          <option value="local">Local Transport</option>
        </select>
        <label>Vendor</label>
        <input type="text" name="trasportVendor" defaultValue={entry.transport.vendor} ref={input => el.trasportVendor = input}/>
        <label>Amount</label>
        <input name="trasportAmt" defaultValue={entry.transport.amount } ref={input => el.trasportAmt = input}/>

        <label htmlFor="file">Add Transport Receipt</label>
        <input type="file" name="transportReceipt" accept="image/*" ref={input => el.transportReceipt = input}/>

      </div>
      <div>
        <h3>Lodging</h3>
        <label>Start Date:</label>
        <input type="date" ref= {input => el.lodgeStartDate = input} name="startDate" onChange={el.onDateChange}/>
        <label>End Date:</label>
        <input type="date" ref= {input => el.lodgeEndDate = input} name="endDate" onChange={el.onDateChange} />
        <label>Vendor</label>
        <input type="text" name="vendor" defaultValue={entry.lodging.vendor } ref={input => el.lodgeVendor = input}/>
        <label>Amount</label>
        <input name="lodgeAmount" defaultValue={entry.lodging.vendor } ref={input => el.lodgeAmt = input}/>
        <button name="addLodgeReceipt">Add Receipt</button>
      </div>
      <div>
        <h3>Meals</h3>
        <label>Breakfast</label>
        <input name="breakfastVendor" defaultValue={entry.meals.breakfast.vendor } ref={input => el.breakfastVendor = input}/>
        <input name="breakfastAmt" defaultValue={entry.meals.breakfast.amount } ref={input => el.breakfastAmt = input}/>
        <button name="addBreakfastReceipt">Add Receipt</button>
        <label>Lunch</label>
        <input name="lunchVendor" defaultValue={entry.meals.lunch.vendor } ref={input => el.lunchVendor = input}/>
        <input name="lunchAmt" defaultValue={entry.meals.lunch.amount } ref={input => el.lunchAmt = input}/>
        <button name="addLunchReceipt">Add Receipt</button>
        <label>Dinner</label>
        <input name="dinnerVendor" defaultValue={entry.meals.dinner.vendor } ref={input => el.dinnerVendor = input}/>
        <input name="dinnerAmt" defaultValue={entry.meals.dinner.amount } ref={input => el.dinnerAmt = input}/>
        <button name="addDinnerReceipt">Add Receipt</button>
      </div>
      <button type="button"  onClick={() => saveAndNext(el)}> Next </button>
    </form>
  );
};

class TripDetails extends React.Component{
  constructor(props){
    super(props);
    this.changePage = this.changePage.bind(this);
    this.saveAndNext = this.saveAndNext.bind(this);
    this.state = {
      errorState: false,
      //entry: props.entry
    }
  }
  changePage(pageNum){
    console.log('change');
    this.props.dispatch(setCurrentPage(pageNum));
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.currentPage != this.props.currentPage)
      return true;
  }
  saveAndNext(el){
    let entry = {
      transport: {},
      lodging: {},
      meals: {
        breakfast:{},
        lunch:{},
        dinner:{}
      }
    };
    entry.transport.type = el.trasportType.value;
    entry.transport.vendor = el.trasportVendor.value;
    entry.transport.amount = el.trasportAmt.value;
    entry.transport.receipt = el.transportReceipt.files;

    entry.lodging.vendor = el.lodgeVendor.value;
    entry.lodging.amount = el.lodgeAmt.value;

    entry.meals.breakfast.vendor = el.breakfastVendor.value;
    entry.meals.breakfast.amount = el.breakfastAmt.value;

    entry.meals.lunch.vendor = el.lunchVendor.value;
    entry.meals.lunch.amount = el.lunchAmt.value;

    entry.meals.dinner.vendor = el.dinnerVendor.value;
    entry.meals.dinner.amount = el.dinnerAmt.value;

    this.props.dispatch(addEntry(entry,this.props.currentPage));
    this.props.dispatch(nextPage());
  }
  render(){
    const entry = this.props.entry;
    //const entry = this.state.entry;
    return (
      <div className="trip-details">
        <BreadCrumb pages = {this.props.pages} currentPage={this.props.currentPage}  changePage = {this.changePage} />
        <TripForm entry={entry} saveAndNext={this.saveAndNext} key={this.props.currentPage} />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps)=> {
  return {
    entry: state.entries[state.currentPage] ? state.entries[state.currentPage]: {
      transport: {},
      lodging: {},
      meals: {
        breakfast:{},
        lunch:{},
        dinner:{}
      }
    },
    pages: state.tripDates.pages,
    currentPage : state.currentPage,
    formCompletd : state.formCompletd
  };
};

export default withRouter(connect(mapStateToProps)(TripDetails));

import React from 'react';
import './../less/trips.less';
import { setCurrentPage } from '../store.js';
import {connect} from  'react-redux';
import {withRouter} from 'react-router-dom';
import {DateManager} from '../Utils.js';


let BreadCrumb = ({pages}) => {
  console.log(pages);
  return (
    <div className="bread-crumbs">
      {pages.map((page) => {
        return (<button key ={"page"+page.page} >{DateManager.formatDate(page.date)}</button>);
      })}
    </div>
  );
}
class TripDetails extends React.Component{
  constructor(){
    super();
    this.state = {

    };
    this.nextClick = this.nextClick.bind(this);
  }

  nextClick(e){
    e.preventDefault();
  }

  render(){
    return (
      <div className="trip-details">
        <BreadCrumb />
        <form>
          <div>
            <h3>Trasport</h3>
            <label>Type</label>
            <select ref= {input => this.trasportType = input} name="trasportType" onChange={this.onTransportChange}/>
            <label>Vendor</label>
            <input type="text" name="vendor" />
            <label>Amount</label>
            <input name="tripAmount" />
            <button name="addTransportReceipt">Add Receipt</button>
          </div>
          <div>
            <h3>Lodging</h3>
              <label>Start Date:</label>
              <input type="date" ref= {input => this.lodgeStartDate = input} name="startDate" onChange={this.onDateChange}/>
              <label>End Date:</label>
              <input type="date" ref= {input => this.lodgeEndDate = input} name="endDate" onChange={this.onDateChange} />
              <label>Vendor</label>
              <input type="text" name="vendor" />
              <label>Amount</label>
              <input name="lodgeAmount" />
              <button name="addLodgeReceipt">Add Receipt</button>
          </div>
          <div>
            <h3>Meals</h3>
            <label>Breakfast</label>
            <input name="breakfast" />
            <label>Lunch</label>
            <input name="lunch" />
            <label>Dinner</label>
            <input name="dinner" />
          </div>

          <div className={"error "+ (this.state.errorState ? '' : 'hide')}>The end date cannot be less than the start date.</div>
          <button className={this.state.nextBtn} onClick={this.nextClick}>Next</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps)=> {
  console.log("HERE 1");
  console.log(state.tripDates);
  return {
    entries: state.entries,
    pages: state.tripDates.pages
  };
};


TripDetails = withRouter(connect(mapStateToProps)(TripDetails));

export default TripDetails;

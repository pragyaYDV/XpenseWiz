import React from 'react';
import './../less/trip-dates.less';
import { setDates } from '../store.js';
import {connect} from  'react-redux';
import {Link,withRouter} from 'react-router-dom';
import TripDetails from './TripDetails.jsx';

class TripsHome extends React.Component{
  constructor(){
    super();
    this.state = {
      nextbtn: "",
      errorState: false
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.nextClick = this.nextClick.bind(this);
  }

  onDateChange(e){
    let nextBtn = "",errorState=false;
    if(this.startDate.value && this.endDate.value){
      if((new Date(this.startDate.value)) <= (new Date(this.endDate.value))){
        nextBtn = "active";
        errorState = false;
      }else{
        errorState = true;
      }
    }
    this.setState({nextBtn : nextBtn, errorState : errorState});
  }

  nextClick(e){
    //e.preventDefault();
    this.props.dispatch(setDates(this.startDate.value, this.endDate.value));
  }

  render(){
    return (
      <div className="trip-dates">
        <form>
          <p>Please select the start and end date for the trip</p>
          <div>
            <label>Start Date:</label>
            <input type="date" ref= {input => this.startDate = input} name="startDate" onChange={this.onDateChange}/>
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" ref= {input => this.endDate = input} name="endDate" onChange={this.onDateChange} />
          </div>
          <div className={"error "+ (this.state.errorState ? '' : 'hide')}>The end date cannot be less than the start date.</div>
          <Link to={'/tripDetails'} onClick={this.nextClick}>Next</Link>
        </form>
      </div>

    );
  }
}

TripsHome = withRouter(connect()(TripsHome));
export default TripsHome;

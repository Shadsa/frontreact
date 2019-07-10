import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import './YearSelector.css';

/**
 * Selector to choose which year's position to display
 */
export class YearSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValues: [this.props.minYear, this.props.maxYear],
            years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
        };
    }
    

    handleChange = (tab) => {
        this.setState({ sliderValues: tab }, () => {
            this.props.onHandleYearChange(this.state.sliderValues);
        });
    }

    render() {
        const marks = { 2004: 2004, 2005: 2005, 2006: 2006, 2007: 2007, 2008: 2008, 2009: 2009, 2010: 2010, 2011: 2011, 2012: 2012, 2013: 2013, 2014: 2014, 2015: 2015, 2016: 2016, 2017: 2017 };
        return (
          <div className="yearSelectorBlock">
            <p>
Positions de nids de 
              {' '}
              {this.state.sliderValues[0]}
              {' '}
à 
              {' '}
              {this.state.sliderValues[1]}
              {'.'}
            </p>
            <Range
              min={this.state.years[0]}
              max={this.state.years[this.state.years.length-1]}
              defaultValue={this.state.sliderValues}
              allowCross={false}
              dots
              marks={marks}
              onAfterChange={this.handleChange}
            />
          </div>
        );
    }
}

export default YearSelector;

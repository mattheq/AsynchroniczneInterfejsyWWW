import React from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';

class DatetimeInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"field"}>
                <label>{this.props.label}</label>
                <Datepicker
                    selected={this.props.daytime}
                    onChange={(date) => this.props.setFieldValue("daytime", date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="LLL"
                    timeCaption="time"
                />
            </div>
        );
    }
}

export default DatetimeInput;
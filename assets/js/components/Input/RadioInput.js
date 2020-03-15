import React from 'react';
import { Field } from 'formik';

class RadioInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="field">
                <div className="ui radio checkbox">
                    <Field
                        type="radio"
                        name={this.props.name}
                        tabIndex="0"
                        value={this.props.value}
                        checked={this.props.type === this.props.value}
                        onChange={() => this.props.setFieldValue(this.props.name, this.props.value)} />
                    <label>{this.props.label}</label>
                </div>
            </div>
        );
    }
}

export default RadioInput;
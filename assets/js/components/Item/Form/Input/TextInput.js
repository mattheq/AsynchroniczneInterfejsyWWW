import React from 'react';
import { Field } from 'formik';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"field " + (this.props.touched && this.props.errors && "error")}>
                <label>{this.props.label}</label>
                <Field type="text" name={this.props.name} />
                {this.props.touched && this.props.errors && <div className="ui basic red pointing prompt label">{this.props.errors}</div>}
            </div>
        );
    }
}

export default TextInput;
import React from 'react';
import TextInput from './TextInput.js';
import DatetimeInput from './DatetimeInput.js';
import { Segment, Form, Label } from 'semantic-ui-react';

class AdditionalInfoInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment>
                <Label attached='top'>{this.props.label}</Label>
                <Form.Group widths='equal'>
                    <TextInput type={"text"} name={"country"} label={"Country"}/>
                    <TextInput type={"text"} name={"city"} touched={this.props.touched.city} errors={this.props.errors.city} label={"City"}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <TextInput type={"text"} name={"street"} label={"Street"}/>
                    <TextInput type={"text"} name={"street_number"} label={"Street number"}/>
                    <DatetimeInput daytime={this.props.daytime} setFieldValue={this.props.setFieldValue} label={"Daytime"} />
                </Form.Group>
            </Segment>
        );
    }
}

export default AdditionalInfoInput;
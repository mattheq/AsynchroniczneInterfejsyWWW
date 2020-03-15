import React from 'react';
import { List } from 'semantic-ui-react';
import * as ItemConstants from "../../constants/ItemConstants";
import moment from 'moment';

class ItemViewAddressDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let country = (this.props.country !== '' && this.props.country != null) ? this.props.country : 'Not provided';
        let type = this.props.type === ItemConstants.ITEM_MISSING ? 'Lost' : 'Found';
        let street = 'Not provided';

        if (typeof this.props.street !== "undefined" && this.props.street !== '' && this.props.street != null) {
            street = this.props.street;
            if (typeof this.props.streetNumber !== "undefined" && this.props.streetNumber !== '' && this.props.streetNumber != null) {
                street += ' ' + this.props.streetNumber;
            }
        }

        return (
            <List>
                <List.Item icon='flag' content={`Country: ${country}`} />
                <List.Item icon='point' content={'City: ' + this.props.city} />
                <List.Item icon='road' content={`Street: ${street}`} />
                <List.Item icon='clock' content={`${type} around: ${moment.unix(this.props.daytime).format('LLL')}`} />
            </List>
        );
    }
}

export default ItemViewAddressDetails;
import React from 'react';
import { Card, Button, Label } from 'semantic-ui-react';
import AuthHelper from '../../helpers/AuthHelper';

class ItemViewContactCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user_id = AuthHelper.getCredentials() ? AuthHelper.getCredentials().user_id : null;

        return (
            <Card fluid>
                <Card.Content>
                    <Label ribbon style={{ marginBottom: '10px' }}>
                        User contact
                    </Label>
                    <Card.Header>{this.props.user.firstname} {this.props.user.lastname}</Card.Header>
                    <Card.Meta>Phone number: {this.props.user.phone_number}</Card.Meta>
                    <Card.Meta>Email: {this.props.user.email}</Card.Meta>
                </Card.Content>
                {user_id !== null ? (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => this.props.onOpenChatButtonClick()}>
                                Open chat
                            </Button>
                        </div>
                    </Card.Content>
                ) : ''}
            </Card>
        );
    }
}

export default ItemViewContactCard;
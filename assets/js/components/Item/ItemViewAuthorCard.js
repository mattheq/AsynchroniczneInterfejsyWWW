import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

class ItemViewAuthorCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Divider horizontal />
                <Button fluid color={'green'} onClick={() => this.props.onUpdateButtonClick()}>
                    Update item
                </Button>
                <Divider horizontal>Or</Divider>
                <Button fluid color={'red'} onClick={() => this.props.onDeleteButtonClick()}>
                    Remove item
                </Button>
            </section>
        );
    }
}

export default ItemViewAuthorCard;
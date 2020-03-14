import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Link} from 'react-router-dom';
import {Button, Grid, Label} from 'semantic-ui-react';

class HomePageAddItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!AuthHelper.isLoggedIn()) {
            return false;
        }

        return (
            <Grid columns={1} textAlign={"center"} style={{marginTop: 0}}>
                <div>
                    <Label pointing={"right"} color={"red"}>Found an item? Click here</Label>
                    <Button as={Link} to={"/items/add"} name={"createItem"} inverted color="grey">Add an announcment</Button>
                </div>
            </Grid>
        );
    }
}

export default HomePageAddItem;
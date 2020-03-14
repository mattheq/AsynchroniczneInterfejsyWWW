import React from 'react';
import {Button, Icon, Input, Grid} from 'semantic-ui-react';
import AuthHelper from "../../helpers/AuthHelper";
import qs from "qs";
import {withRouter, Link} from 'react-router-dom';

class ItemListSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        if (this.props.location.search !== null) {
            this.setState({
                searchValue: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search
            });
        }
    }

    handleChange(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    onKeyPress(e) {
        if ('Enter' === e.key) {
            this.props.updateList(this.state.searchValue);
        }
    }

    render() {
        let searchString = '';
        return (
            <Grid.Row>
                <Grid.Column width={AuthHelper.isLoggedIn() ? 14 : 18}>
                    <Input
                        value={this.state.searchValue}
                        onChange={this.handleChange}
                        icon={<Icon name="search" inverted circular link onClick={() => this.props.updateList(this.state.searchValue)} />}
                        placeholder="Search..."
                        onKeyPress={this.onKeyPress}
                        style={{paddingBottom: '10px', width: '87%'}}
                    />
                </Grid.Column>
                {AuthHelper.isLoggedIn() ?
                <Grid.Column width={2}>
                    <Button as={Link} to={"/items/add"} name={"createItem"} floated='right'>Add new</Button>
                </Grid.Column>
                    : null }
            </Grid.Row>
        );
    }
}

export default withRouter(ItemListSearchBar);
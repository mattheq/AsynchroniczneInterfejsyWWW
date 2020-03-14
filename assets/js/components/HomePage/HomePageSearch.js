import React from 'react';
import HomePageAddItem from './HomePageAddItem.js';
import {Container, Divider, Header, Icon, Input, } from 'semantic-ui-react';
import {Trans, withNamespaces} from 'react-i18next';
import {withRouter} from 'react-router-dom';

class HomePageSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        };

        this.onSearchBarChange = this.onSearchBarChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    onSearchBarChange(e) {
        this.setState({
            searchValue: e.target.value
        })
    }

    onKeyPress(e) {
        if ('Enter' === e.key) {
            this.redirect();
        }
    }

    redirect() {
        let redirectTo = '/items';
        if (this.state.searchValue !== '') {
            this.props.history.push(`${redirectTo}?search=${this.state.searchValue}`);
        } else {
            this.props.history.push(redirectTo);
        }
    }

    render() {
        return (
            <Container className={"home-search-bar"} textAlign={"center"}>
                <Header size={"huge"} inverted><Trans>Lost and Found</Trans></Header>
                <Input
                    value={this.state.searchValue}
                    onChange={this.onSearchBarChange}
                    icon={<Icon
                        name="search"
                        inverted
                        circular
                        link
                        onClick={this.redirect}
                    />}
                    placeholder="Search..."
                    onKeyPress={this.onKeyPress}
                />
                <Divider />
                <HomePageAddItem />
            </Container>
        );
    }
}

export default withRouter(withNamespaces('translation')(HomePageSearch));
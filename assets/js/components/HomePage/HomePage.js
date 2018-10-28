import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Button, Container, Divider, Grid, Header, Icon, Input, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Trans, withNamespaces} from 'react-i18next';
import homeBackground from '../../../images/home_background.jpg';

/* TODO: change input to search bar with latest 10-20 items and category lost/found */
class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectTo: '/items',
            searchValue: '',
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    onKeyPress(e) {
        if ('Enter' === e.key) {
            this.redirect();
        }
    }

    redirect() {
        if (this.state.searchValue !== '') {
            this.props.history.push(this.state.redirectTo + '?search=' + this.state.searchValue);
        } else {
            this.props.history.push(this.state.redirectTo);
        }
    }

    render() {
        return (
            <section className={"home-search-section base-container"}>
                <div className={"home-search-background"}>
                    <img src={homeBackground} />
                </div>
                    <Container className={"home-search-bar"} textAlign={"center"}>
                        <Header size={"huge"} inverted><Trans>What are you looking for?</Trans></Header>
                        <Input
                            value={this.state.searchValue}
                            onChange={(e) => {
                                this.setState({
                                    searchValue: e.target.value
                                })
                            }}
                            icon={<Icon
                                name="search"
                                inverted
                                circular
                                link
                                onClick={() => this.redirect()}
                            />}
                            placeholder="Search..."
                            onKeyPress={(e) => this.onKeyPress(e)}
                        />
                        <Divider />
                        {AuthHelper.isLoggedIn() ? (
                        <Grid columns={1} textAlign={"center"} style={{marginTop: 0}}>
                            <div>
                                <Label pointing={"right"} color={"red"}>Add new missing item</Label>
                                <Button as={Link} to={"/items/add"} name={"createItem"} inverted color="grey">Add new</Button>
                            </div>
                        </Grid>
                            ) : ('')}
                    </Container>
            </section>
        );
    }
}

export default withNamespaces('translation')(HomePage)
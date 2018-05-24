import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Button, Container, Divider, Grid, Header, Icon, Input, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import homeBackground from '../../../images/home_background.jpg';

/* TODO: change input to search bar with latest 10-20 items and category lost/found */
class HomePage extends React.Component {
    render() {
        return (
            <section className={"home-search-section base-container"}>
                <div className={"home-search-background"}>
                    <img src={homeBackground} />
                </div>
                    <Container className={"home-search-bar"} textAlign={"center"}>
                        <Header size={"huge"} inverted>What are you looking for?</Header>
                        <Input icon={<Icon name="search" inverted circular link/>} placeholder="Search..." />
                        <Divider />
                        {AuthHelper.isLoggedIn() ? (
                        <Grid columns={1} textAlign={"center"} style={{marginTop: 0}}>
                            <div>
                                <Label pointing={"right"} color={"red"}>Or maybe you have found something?</Label>
                                <Button as={Link} to={"/items/add"} name={"createItem"} inverted color="grey">Add new</Button>
                            </div>
                        </Grid>
                            ) : ('')}
                    </Container>
            </section>
        );
    }
}

export default HomePage
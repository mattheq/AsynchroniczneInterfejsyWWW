import React from 'react';
import {Button, Container, Divider, Grid, Header, Icon, Input, Label} from 'semantic-ui-react';
import homeBackground from '../../../images/home_background.jpg';

/* TODO: change input to search bar with latest 10-20 items and category lost/found */
class HomePage extends React.Component {
    render() {
        return (
            <section className={"homeSearchSection"}>
                <div className={"homeSearchBackground"}>
                    <img src={homeBackground} />
                </div>
                    <Container className={"homeSearchBar"} textAlign={"center"}>
                        <Header as="h1" inverted>What are you looking for?</Header>
                        <Input icon={<Icon name="search" inverted circular link/>} placeholder="Search..." />
                        <Divider />
                        <Grid columns={1} textAlign={"center"} style={{marginTop: 0}}>
                            <div>
                                <Label pointing={"right"} color={"red"}>Or maybe you have found something?</Label>
                                <Button inverted color="grey">Add new</Button>
                            </div>
                        </Grid>
                    </Container>
            </section>
        );
    }
}

export default HomePage
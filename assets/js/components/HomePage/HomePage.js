import React from 'react';
import {Button, Container, Divider, Icon, Input} from 'semantic-ui-react';
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
                        <Input icon={<Icon name="search" inverted circular link/>} placeholder="Search..." />
                        <Divider />
                        <Button inverted color="grey">Add new</Button>
                    </Container>
            </section>
        );
    }
}

export default HomePage
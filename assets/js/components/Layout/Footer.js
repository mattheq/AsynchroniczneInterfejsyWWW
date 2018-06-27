import React from 'react';
import {Segment, Container, Grid, Header, List} from 'semantic-ui-react';
//TODO: create proper footer
class Footer extends React.Component {

    render() {
        return (
            <Segment inverted vertical style={{ padding: '4em 0em', flex: 1 }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Terms</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Header as='h4' inverted>Project information</Header>
                                <p>This project has been made for course 'Asynchroniczne Interfejsy WWW' at University of Technology in Częstochowa</p>
                                <p>© 2018 Mateusz Grzyb</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
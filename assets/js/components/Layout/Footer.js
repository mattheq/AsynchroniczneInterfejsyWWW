import React from 'react';
import {Segment, Container, Grid, Header, List} from 'semantic-ui-react';
//TODO: create proper footer
class Footer extends React.Component {

    render() {
        return (
            <Segment inverted vertical style={{ padding: '4em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h4' inverted>Project information</Header>
                                <p>This project has been made for course 'Asynchroniczne Interfejsy WWW' at University of Technology in Częstochowa</p>
                                <p>© {new Date().getFullYear()} Mateusz Grzyb</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
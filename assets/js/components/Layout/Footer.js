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
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Header as='h4' inverted>Footer Header</Header>
                                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
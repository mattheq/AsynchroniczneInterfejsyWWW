import React from 'react';
import ItemListSearchBar from './ItemListSearchBar.js';
import ItemStore from '../../stores/ItemStore';
import {Breadcrumb, Button, Card, Container, Dimmer, Icon, Image, Input, Pagination, Loader, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import defaultImage from '../../../images/white-image.png';
import sadPepe from '../../../images/sad_pepe.svg';
import PaginationHelper from '../../helpers/PaginationHelper';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";
import qs from "qs";
import AuthHelper from "../../helpers/AuthHelper";

class ItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            pagination: {},
            isLoading: true,
            activePage: 1
        };

        this.handleItemsFetchSuccess = this.handleItemsFetchSuccess.bind(this);
        this.handleItemsFetchFailed = this.handleItemsFetchFailed.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEMS_FETCH_SUCCESS, this.handleItemsFetchSuccess);
        ItemStore.on(ItemConstants.ITEMS_FETCH_FAILED, this.handleItemsFetchFailed);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEMS_FETCH_SUCCESS, this.handleItemsFetchSuccess);
        ItemStore.removeListener(ItemConstants.ITEMS_FETCH_FAILED, this.handleItemsFetchFailed);
    }

    componentDidMount() {
        let searchString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        ItemActions.itemsFetch(searchString);
    }

    handleItemsFetchSuccess(data) {
        this.setState({
            items: data['hydra:member'],
            pagination: data['hydra:view'],
            isLoading: false,
        });
    }

    handleItemsFetchFailed(error) {
        console.log(error);
    }

    handlePageChange(e, data) {
        if (data.activePage !== this.state.activePage) {
            this.setState({
                isLoading: true,
                activePage: data.activePage
            });
            let searchString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            ItemActions.itemsFetch({ page: data.activePage, search: searchString.search})
        }
    }

    updateList(searchValue) {
        ItemActions.itemsFetch({page: this.state.activePage, search: searchValue});
        let searchQuerry = searchValue === '' ? '' : `?search=${searchValue}`
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: searchQuerry
        });
    }

    render() {
        let queryParams = this.props.location.search;
        let pagination = this.state.pagination;
        let user_id = AuthHelper.getCredentials() ? AuthHelper.getCredentials().user_id : null;

        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                <Grid columns={AuthHelper.isLoggedIn() ? 2 : 1}>
                    <ItemListSearchBar updateList={this.updateList}/>
                </Grid>
                {this.state.isLoading ? (
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                ) : (
                    <section>
                        {this.state.items.length > 0 ? (
                            <section>
                                <Card.Group itemsPerRow={4}>
                                    {this.state.items.map((item) =>
                                        <Card key={item.id} href={`/#/items/view/${item.id}`} color={item.user.id === user_id ? 'blue' : 'grey'}>
                                            <Image src={item.photos.length !== 0 ? item.photos[0].path : defaultImage} height={166}/>
                                            <Card.Content>
                                                <Card.Header>
                                                    {item.title}
                                                </Card.Header>
                                                <Card.Meta>
                                                    {ItemConstants.ITEM_MISSING === item.type ? 'Missing' : 'Found'}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {item.description}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </Card.Group>
                                {typeof pagination === "undefined" || PaginationHelper.getTotalPages(pagination['hydra:last']) === 1 ? null : (
                                    <Container textAlign='center'>
                                        <Pagination
                                            defaultActivePage={this.state.activePage}
                                            totalPages={PaginationHelper.getTotalPages(pagination['hydra:last'])}
                                            onPageChange={(e, data) => this.handlePageChange(e, data)}
                                            firstItem={null}
                                            lastItem={null}
                                            pointing
                                            secondary/>
                                    </Container>
                                )}
                            </section>
                        ) : (
                            <div align="center">
                                <Image src={sadPepe} />
                                <h1>Emptiness...</h1>
                            </div>
                        )}
                    </section>
                )}
            </Container>
        )
    }
}

export default ItemList;
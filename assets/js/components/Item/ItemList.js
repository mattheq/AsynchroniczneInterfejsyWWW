import React from 'react';
import ItemListSearchBar from './ItemListSearchBar.js';
import ItemCard from './ItemCard.js';
import ItemPagination from './ItemPagination.js';
import ItemStore from '../../stores/ItemStore';
import {Breadcrumb, Card, Container, Dimmer, Image, Loader, Grid} from 'semantic-ui-react';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import defaultImage from '../../../images/white-image.png';
import sadPepe from '../../../images/sad_pepe.svg';
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

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEMS_FETCH_SUCCESS, this.handleItemsFetchSuccess);
        ItemStore.removeListener(ItemConstants.ITEMS_FETCH_FAILED, this.handleItemsFetchFailed);
    }

    componentDidMount() {
        ItemStore.on(ItemConstants.ITEMS_FETCH_SUCCESS, this.handleItemsFetchSuccess);
        ItemStore.on(ItemConstants.ITEMS_FETCH_FAILED, this.handleItemsFetchFailed);

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
        let searchQuerry = searchValue == null ? '' : `?search=${searchValue}`
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: searchQuerry
        });
    }

    render() {
        let user_id = AuthHelper.getCredentials() ? AuthHelper.getCredentials().user_id : null;
        let listContent = <div align="center"><Image src={sadPepe} /><h1>Emptiness...</h1></div>;

        if (this.state.isLoading) {
            return (
                <Container className={"base-container"}>
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                </Container>
            )
        }

        if (this.state.items.length > 0) {
            listContent =
            <Card.Group itemsPerRow={4}>
                {this.state.items.map((item) =>
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        color={item.user.id === user_id ? 'blue' : 'grey'}
                        image={item.photos.length !== 0 ? item.photos[0].path : defaultImage}
                        title={item.title}
                        type={ItemConstants.ITEM_MISSING === item.type ? 'Lost' : 'Found'}
                        description={item.description}
                    />
                )}
            </Card.Group>;
        }

        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                <Grid columns={AuthHelper.isLoggedIn() ? 2 : 1}>
                    <ItemListSearchBar updateList={this.updateList}/>
                </Grid>
                {listContent}
                <ItemPagination pagination={this.state.pagination} activePage={this.state.activePage} handlePageChange={this.handlePageChange} />
            </Container>
        )
    }
}

export default ItemList;
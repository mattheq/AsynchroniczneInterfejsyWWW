import React from 'react';
import ItemStore from '../../stores/ItemStore';
import {Breadcrumb, Card, Container, Dimmer, Icon, Image, Input, Pagination, Loader} from 'semantic-ui-react';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import defaultImage from '../../../images/white-image.png';
import PaginationHelper from '../../helpers/PaginationHelper';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";
import qs from "qs";

class ItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: {},
            pagination: {},
            isLoading: true,
            activePage: 1,
            searchValue: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search
        };

        this.handleItemFetchSuccess = this.handleItemFetchSuccess.bind(this);
        this.handleItemFetchFailed = this.handleItemFetchFailed.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEM_FETCH_SUCCESS, this.handleItemFetchSuccess);
        ItemStore.on(ItemConstants.ITEM_FETCH_FAILED, this.handleItemFetchFailed);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_FETCH_SUCCESS, this.handleItemFetchSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_FETCH_FAILED, this.handleItemFetchFailed);
    }

    componentDidMount() {
        let searchString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        ItemActions.itemFetch(searchString);
    }

    handleItemFetchSuccess(data) {
        this.setState({
            items: data['hydra:member'],
            pagination: data['hydra:view'],
            isLoading: false,
        });
    }

    handleItemFetchFailed(error) {
        console.log(error);
    }

    handlePageChange(e, data) {
        if (data.activePage !== this.state.activePage) {
            this.setState({
                isLoading: true,
                activePage: data.activePage
            });
            let searchString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            ItemActions.itemFetch({ page: data.activePage, search: searchString.search})
        }
    }

    onKeyPress(e) {
        if ('Enter' === e.key) {
            this.updateList();
        }
    }

    updateList() {
        ItemActions.itemFetch({page: this.state.activePage, search: this.state.searchValue});
        let searchQuerry = this.state.searchValue === '' ? '' : '?search=' + this.state.searchValue
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: searchQuerry
        });
    }

    render() {
        let queryParams = this.props.location.search;
        let pagination = this.state.pagination;
        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
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
                        onClick={() => this.updateList()}
                    />}
                    placeholder="Search..."
                    onKeyPress={(e) => this.onKeyPress(e)}
                    style={{paddingBottom: '10px', width: '100%'}}
                />
                {this.state.isLoading ? (
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                ) : (
                    <section>
                        <Card.Group itemsPerRow={4}>
                            {this.state.items.map((item) =>
                                <Card key={item.id} href={`/#/items/view/${item.id}`} >
                                    <Image src={defaultImage} />
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
                        {PaginationHelper.getTotalPages(pagination['hydra:last']) === 1 ? null : (
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
                )}
            </Container>
        )
    }
}

export default ItemList;
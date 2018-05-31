import React from 'react';
import ItemStore from '../../stores/ItemStore';
import {Breadcrumb, Card, Container, Image, Pagination} from 'semantic-ui-react';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import defaultImage from '../../../images/white-image.png';
import PaginationHelper from '../../helpers/PaginationHelper';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";

class ItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: {},
            pagination: {},
            isLoading: true,
            activePage: 1
        };

        this.handleItemFetchSuccess = this.handleItemFetchSuccess.bind(this);
        this.handleItemFetchFailed = this.handleItemFetchFailed.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
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
        ItemActions.itemFetch();
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
            ItemActions.itemFetch({ page: data.activePage })
        }
    }

    render() {
        let queryParams = this.props.location.search;
        let pagination = this.state.pagination;
        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                {this.state.isLoading ? (
                    <p>LOADING</p>
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
                        <Container textAlign='center'>
                            <Pagination
                                // defaultActivePage={PaginationHelper.getDefaultActivePage(queryParams, pagination['hydra:last'])}
                                defaultActivePage={this.state.activePage}
                                totalPages={PaginationHelper.getTotalPages(pagination['hydra:last'])}
                                onPageChange={(e, data) => this.handlePageChange(e, data)}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary/>
                        </Container>
                    </section>
                )}
            </Container>
        )
    }
}

export default ItemList;
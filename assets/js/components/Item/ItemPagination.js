import React from 'react';
import { Container, Pagination } from 'semantic-ui-react';
import PaginationHelper from '../../helpers/PaginationHelper';

class ItemPagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let pagination = this.props.pagination;

        if (typeof pagination === "undefined" || PaginationHelper.getTotalPages(pagination['hydra:last']) === 1) {
            return false;
        }

        return (
            <Container textAlign='center'>
                <Pagination
                    defaultActivePage={this.props.activePage}
                    totalPages={PaginationHelper.getTotalPages(pagination['hydra:last'])}
                    onPageChange={(e, data) => this.props.handlePageChange(e, data)}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary />
            </Container>
        );
    }
}

export default ItemPagination;
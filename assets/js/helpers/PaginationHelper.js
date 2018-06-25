import qs from "qs";

class PaginationHelper {

    getTotalPages(url) {
        return this.parseUrl(url);
    }

    getDefaultActivePage(queryParams, url) {
        let params = qs.parse(queryParams, { ignoreQueryPrefix: true });

        if (!params.hasOwnProperty('page') || params.page <= 0) {
            return 1;
        }

        if (params.page <= this.getTotalPages(url)) {
            return params.page;
        }

        return this.getTotalPages(url);
    }

    getNextPage(url) {
        return this.parseUrl(url) + 1;
    }

    getPrevPage(url) {
        let currentPage = this.parseUrl(url);

        if (1 === currentPage) {
            return currentPage;
        }

        return currentPage - 1;
    }

    parseUrl(url) {
        if (!url) {
            return 1;
        }
        let pageQueryParamString = "?page=";
        let index = url.lastIndexOf(pageQueryParamString);
        if (-1 === index) {
            pageQueryParamString = "&page=";
            index = url.lastIndexOf(pageQueryParamString);
            if (-1 === index) {
                return 1;
            }
        }

        let pageString = url.substr(index + pageQueryParamString.length);
        let page = pageString.match(/\d+/g);

        return page[0];
    }
}

const paginationHelper = new PaginationHelper();
export default paginationHelper;
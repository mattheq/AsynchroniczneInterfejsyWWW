class BreadcrumbHelper {

    generate (pathname) {
        let paths = pathname.split("/");

        // remove the last element if there was a / at the end of the pathname
        paths = paths[paths.length-1] === "" ? paths.slice(0, paths.length-1) : paths;

        // remove the first element if the second one is an empty string which means that we are in the root of the website
        paths = paths[1] === "" ? paths.slice(1) : paths;

        let breadcrumb = paths.map((path, index) => {
            // Set active to true for last element
            let last = index === paths.length - 1;

            // The first element - home
            if (index === 0) {
                return { key: 'Home', content: 'Home', href: "/#/" };
            }

            // Build the path for the current URL
            let url = '/#' + paths.slice(0, index+1).join('/');

            // Array for every link except the first
            let pathContent = path.charAt(0).toUpperCase() + path.slice(1);

            if (last) {
                return { key: pathContent, content: pathContent, active: true }
            }

            return { key: pathContent, content: pathContent, href: url };
        });

        if (!isNaN(breadcrumb[breadcrumb.length-1].content)) {
            breadcrumb.splice(-1, 1);
            delete breadcrumb[breadcrumb.length-1].href;
            breadcrumb[breadcrumb.length-1].active = true;
        }

        return breadcrumb;
    }
}

const breadcrumbHelper = new BreadcrumbHelper();
export default breadcrumbHelper;
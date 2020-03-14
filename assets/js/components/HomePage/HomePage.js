import React from 'react';
import HomePageSearch from './HomePageSearch.js';
import homeBackground from '../../../images/home_background.jpg';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={"home-search-section base-container"}>
                <div className={"home-search-background"}>
                    <img src={homeBackground} />
                </div>

                <HomePageSearch />
            </section>
        );
    }
}

export default HomePage;
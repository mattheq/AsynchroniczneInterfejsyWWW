import React from 'react';
import Navbar from "./Navbar";

class BaseLayout extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BaseLayout
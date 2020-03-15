import React from 'react';
import ItemViewAuthorCard from './ItemViewAuthorCard.js';
import ItemViewContactCard from './ItemViewContactCard.js';
import { Card, Button, Label } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import AuthHelper from '../../helpers/AuthHelper';

class ItemViewLeftMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let images = [];
        let user_id = AuthHelper.getCredentials() ? AuthHelper.getCredentials().user_id : null;

        if (typeof this.props.photos !== "undefined" && this.props.photos.length > 0) {
            images = this.props.photos.map((photo) => {
                return {
                    original: photo.path
                }
            });
        }

        return (
            <section>
                <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showIndex={true}
                    showThumbnails={false}
                />
                {this.props.user.id !== user_id ?
                (
                    <ItemViewContactCard user={this.props.user} onOpenChatButtonClick={this.props.onOpenChatButtonClick} />
                ) : (
                    <ItemViewAuthorCard onUpdateButtonClick={this.props.onUpdateButtonClick} onDeleteButtonClick={this.props.onDeleteButtonClick}/>
                )}
            </section>
        );
    }
}

export default ItemViewLeftMenu;
import React from 'react';

class PhotoThumb extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            thumb: undefined,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.photo) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    loading: false,
                    thumb: reader.result
                });
            };

            reader.readAsDataURL(nextProps.photo);
        });
    }

    render() {
        const { photo } = this.props;
        const { loading, thumb } = this.state;

        if (!photo) {
            return null;
        }

        if (loading) {
            return <p>loading...</p>;
        }

        return (
            <img src={thumb}
                     alt={photo.name}
                     className="img-thumbnail mt-2"
                     height={200}
                     width={200} />
        );
    }
}

export default PhotoThumb;
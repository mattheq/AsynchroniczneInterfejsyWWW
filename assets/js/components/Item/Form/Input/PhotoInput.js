import React from 'react';
import Dropzone from 'react-dropzone';
import { Segment, Label } from 'semantic-ui-react';
import PhotoThumb from "../../../PhotoThumb/PhotoThumb";

const dropzoneStyle = {
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: 5,
};

class PhotoInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment>
                <Label attached='top'>{this.props.label}</Label>
                <div className={"field " + (this.props.errors && "error")}>
                    <Dropzone style={dropzoneStyle} accept="image/*" onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length === 0) {
                            return;
                        }

                        this.props.setFieldValue(this.props.name, this.props.files.concat(acceptedFiles));
                    }}>
                        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                            if (isDragActive) {
                                return "This file is authorized";
                            }

                            if (isDragReject) {
                                return "This file is not authorized";
                            }

                            if (this.props.files.length === 0) {
                                return <p>Try dragging a photo here!</p>
                            }

                            return this.props.files.map((photo, i) => (
                                <PhotoThumb key={i} photo={photo} />
                            ));
                        }}
                    </Dropzone>
                </div>
            </Segment>
        );
    }
}

export default PhotoInput;
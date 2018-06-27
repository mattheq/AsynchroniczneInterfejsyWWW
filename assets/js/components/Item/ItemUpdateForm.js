import React from 'react';
import { Button, Breadcrumb, Segment, Container, Form, Label, Icon } from 'semantic-ui-react';
import ItemStore from '../../stores/ItemStore';
import { Formik, Field } from 'formik';
import Yup from 'yup';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";
import PhotoThumb from "../PhotoThumb/PhotoThumb";
import Dropzone from 'react-dropzone';
import Datepicker from 'react-datepicker';
import moment from 'moment';

class ItemUpdateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                id: '',
                title: '',
                description: '',
                type: '',
                item_details: {
                    id: '',
                    country: '',
                    city: '',
                    street: '',
                    street_number: '',
                    daytime: ''
                }
            },
            loading: true,
        };

        this.handleItemViewSuccess = this.handleItemViewSuccess.bind(this);
        this.handleItemViewFailed = this.handleItemViewFailed.bind(this);
        this.handleItemUpdateSuccess = this.handleItemUpdateSuccess.bind(this);
        this.handleItemUpdateFailed = this.handleItemUpdateFailed.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.on(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.on(ItemConstants.ITEM_UPDATE_SUCCESS, this.handleItemUpdateSuccess);
        ItemStore.on(ItemConstants.ITEM_UPDATE_FAILED, this.handleItemUpdateFailed);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.removeListener(ItemConstants.ITEM_UPDATE_SUCCESS, this.handleItemUpdateSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_UPDATE_FAILED, this.handleItemUpdateFailed);
    }

    componentDidMount() {
        ItemActions.itemView(this.props.match.params.id);
    }

    handleItemViewSuccess(data) {
        this.setState({
            item: data,
            loading: false
        });
    }

    handleItemViewFailed(error) {
        console.log(error);
    }

    handleItemUpdateSuccess(data) {
        this.props.history.push("/items/view/" + data.id);
    }

    handleItemUpdateFailed(error) {
        console.log(error);
    }

    render() {
        return (
            <Container className="base-container" >
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                {this.state.isLoading ? (
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                ) : (
                    <Segment className="four wide column">
                        <Formik
                            initialValues={{
                                title: this.state.item.title,
                                description: this.state.item.description,
                                type: this.state.item.type,
                                country: this.state.item.item_details.country == null ? '' : this.state.item.item_details.country,
                                city: this.state.item.item_details.city,
                                street: this.state.item.item_details.street == null ? '' : this.state.item.item_details.street,
                                street_number: this.state.item.item_details.street_number == null ? '' : this.state.item.item_details.street_number,
                                daytime: moment.unix(this.state.item.item_details.daytime),
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                let submitData = {
                                    title: values.title,
                                    description: values.description,
                                    type: values.type,
                                    item_details: {
                                        id: this.state.item.item_details.id,
                                        country: values.country,
                                        city: values.city,
                                        street: values.street,
                                        street_number: values.street_number,
                                        daytime: values.daytime.unix()
                                    }
                                };
                                ItemActions.itemUpdate(this.state.item.id, submitData);
                                setSubmitting(false);
                            }}

                            validationSchema={Yup.object().shape({
                                title: Yup.string().required('Title name is required'),
                                description: Yup.string().required('Description name is required'),
                                city: Yup.string().required('City is required'),
                            })}

                            enableReinitialize

                            render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className={"field " + (touched.title && errors.title && "error")}>
                                        <label>Title</label>
                                        <Field type="text" name="title" />
                                        {touched.title && errors.title && <div className="ui basic red pointing prompt label">{errors.title}</div>}
                                    </div>
                                    <div className={"field " + (touched.description && errors.description && "error")}>
                                        <label>Description</label>
                                        <Field type="text" name="description" />
                                        {touched.description && errors.description && <div className="ui basic red pointing prompt label">{errors.description}</div>}
                                    </div>
                                    <div className={"field"}>
                                        <label>Item type</label>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <Field type="radio" name="type" tabIndex="0" value="0" checked={values.type === 0} onChange={() => setFieldValue("type", 0)} />
                                            <label>Missing</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <Field type="radio" name="type" tabIndex="0" value="1" checked={values.type === 1} onChange={() => setFieldValue("type", 1)}/>
                                            <label>Found</label>
                                        </div>
                                    </div>
                                    <Segment>
                                        <Label attached='top'>Additional information</Label>
                                        <Form.Group widths='equal'>
                                            <div className={"field "}>
                                                <label>Country</label>
                                                <Field type="text" name="country" />
                                            </div>
                                            <div className={"field " + (touched.city && errors.city && "error")}>
                                                <label>City</label>
                                                <Field type="text" name="city" />
                                                {touched.city && errors.city && <div className="ui basic red pointing prompt label">{errors.city}</div>}
                                            </div>
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <div className={"field "}>
                                                <label>Street</label>
                                                <Field type="text" name="street" />
                                            </div>
                                            <div className={"field "}>
                                                <label>Street number</label>
                                                <Field type="text" name="street_number" />
                                            </div>
                                            <div className={"field"}>
                                                <label>Daytime</label>
                                                <Datepicker
                                                    selected={values.daytime}
                                                    onChange={(date) => setFieldValue("daytime", date)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="LLL"
                                                    timeCaption="time"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Segment>

                                    <Button type={"submit"} disabled={isSubmitting} primary>Update</Button>
                                </Form>
                            )}
                        />
                    </Segment>
                )}
            </Container>
        );
    }
}

export default ItemUpdateForm;
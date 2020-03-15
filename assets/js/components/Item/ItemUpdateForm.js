import React from 'react';
import TextInput from '../Input/TextInput.js';
import RadioInput from '../Input/RadioInput.js';
import AdditionalInfoInput from '../Input/AdditionalInfoInput.js';
import { Button, Breadcrumb, Segment, Container, Form } from 'semantic-ui-react';
import ItemStore from '../../stores/ItemStore';
import { Formik } from 'formik';
import Yup from 'yup';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";
import moment from 'moment';
import { toast } from 'react-toastify';

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
            isButtonLoading: false
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
        toast.success("Item has been updated!");
        this.props.history.push(`/items/view/${data.id}`);
    }

    handleItemUpdateFailed(error) {
        toast.error("Item updation failed!");
        this.setState({
            isButtonLoading: false
        });
        console.log(error);
    }

    render() {
        let formInitialValues = {
            title: this.state.item.title,
            description: this.state.item.description,
            type: this.state.item.type,
            country: this.state.item.item_details.country == null ? '' : this.state.item.item_details.country,
            city: this.state.item.item_details.city,
            street: this.state.item.item_details.street == null ? '' : this.state.item.item_details.street,
            street_number: this.state.item.item_details.street_number == null ? '' : this.state.item.item_details.street_number,
            daytime: moment.unix(this.state.item.item_details.daytime)
        };

        let validationSchema = Yup.object().shape({
            title: Yup.string().required('Title name is required'),
            description: Yup.string().required('Description name is required'),
            city: Yup.string().required('City is required'),
        });

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
                            initialValues={formInitialValues}

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
                                this.setState({
                                    isButtonLoading: true
                                });
                                ItemActions.itemUpdate(this.state.item.id, submitData);
                                setSubmitting(false);
                            }}

                            validationSchema={validationSchema}

                            enableReinitialize

                            render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <TextInput type={"text"} name={"title"} touched={touched.title} errors={errors.title} label={"Title"}/>
                                    <TextInput type={"text"} name={"description"} touched={touched.description} errors={errors.description} label={"Description"}/>
                                    <RadioInput name={"type"} value={0} type={values.type} setFieldValue={setFieldValue} label={"Lost"}/>
                                    <RadioInput name={"type"} value={1} type={values.type} setFieldValue={setFieldValue} label={"Found"}/>
                                    <AdditionalInfoInput touched={touched} errors={errors} daytime={values.daytime} setFieldValue={setFieldValue} label={"Additional information"}/>

                                    <Button type={"submit"} loading={this.state.isButtonLoading} disabled={isSubmitting} primary>Update</Button>
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
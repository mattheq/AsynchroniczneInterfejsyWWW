import React from 'react';
import TextInput from '../Input/TextInput.js';
import RadioInput from '../Input/RadioInput.js';
import PhotoInput from '../Input/PhotoInput.js';
import AdditionalInfoInput from '../Input/AdditionalInfoInput.js';
import { Formik } from 'formik';
import Yup from 'yup';
import { Button, Breadcrumb, Segment, Container, Form } from 'semantic-ui-react';
import ItemStore from '../../stores/ItemStore';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";
import moment from 'moment';
import { toast } from 'react-toastify';

class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

        this.handleItemCreateSuccess = this.handleItemCreateSuccess.bind(this);
        this.handleItemCreateFailed = this.handleItemCreateFailed.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEM_CREATE_SUCCESS, this.handleItemCreateSuccess);
        ItemStore.on(ItemConstants.ITEM_CREATE_FAILED, this.handleItemCreateFailed);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_CREATE_SUCCESS, this.handleItemCreateSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_CREATE_FAILED, this.handleItemCreateFailed);
    }

    handleItemCreateSuccess(data) {
        toast.success("Item has been created!");
        this.props.history.push(`/items/view/${data.id}`);
    }

    handleItemCreateFailed(error) {
        toast.error("Item creation failed!");
        this.setState({
            isLoading: false
        });
        console.log(error);
    }

    render() {
        let formInitialValues = {
            title: '',
            description: '',
            type: 0,
            files: [],
            country: '',
            city: '',
            street: '',
            street_number: '',
            daytime: moment()
        };

        let validationSchema = Yup.object().shape({
            title: Yup.string().required('Title name is required'),
            description: Yup.string().required('Description name is required'),
            city: Yup.string().required('City is required'),
        });

        return (
            <Container className="base-container" >
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                <Segment className="four wide column">
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}

                        onSubmit={(values, { setSubmitting }) => {
                            this.setState({
                                isLoading: true
                            });
                            ItemActions.itemCreate({create_item: values});
                            setSubmitting(false);
                        }}

                        render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <TextInput type={"text"} name={"title"} touched={touched.title} errors={errors.title} label={"Title"}/>
                                <TextInput type={"text"} name={"description"} touched={touched.description} errors={errors.description} label={"Description"}/>
                                <div className={"field"}>
                                    <label>Item type</label>
                                </div>
                                <RadioInput name={"type"} value={"0"} type={values.type.toString()} setFieldValue={setFieldValue} label={"Lost"}/>
                                <RadioInput name={"type"} value={"1"} type={values.type.toString()} setFieldValue={setFieldValue} label={"Found"}/>
                                <PhotoInput name={"files"} files={values.files} errors={errors.files} setFieldValue={setFieldValue} label={"Photos"}/>
                                <AdditionalInfoInput touched={touched} errors={errors} daytime={values.daytime} setFieldValue={setFieldValue} label={"Additional information"}/>

                                <Button type={"submit"} loading={this.state.isLoading} disabled={isSubmitting} primary>Create</Button>
                            </Form>
                        )}
                    />
                </Segment>
            </Container>
        );
    }
}

export default ItemForm
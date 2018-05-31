import React from 'react';
import { Button, Breadcrumb, Segment, Container, Form } from 'semantic-ui-react';
import ItemStore from '../../stores/ItemStore';
import { Formik, Field } from 'formik';
import Yup from 'yup';
import * as ItemActions from '../../actions/ItemActions';
import * as ItemConstants from '../../constants/ItemConstants';
import BreadcrumbHelper from "../../helpers/BreadcrumbHelper";

class ItemForm extends React.Component {
    constructor(props) {
        super(props);

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
        let json = JSON.parse(data);
        this.props.history.push("/items/view/" + json.id);
    }

    handleItemCreateFailed(error) {
        console.log(error);
    }

    render() {
        return (
            <Container className="base-container" >
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                <Segment className="four wide column">
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            type: 0,
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            ItemActions.itemCreate({create_item: values});
                            setSubmitting(false);
                        }}

                        validationSchema={Yup.object().shape({
                            title: Yup.string().required('Title name is required'),
                            description: Yup.string().required('Description name is required'),
                        })}

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
                                <Button type={"submit"} disabled={isSubmitting} primary>Create</Button>
                            </Form>
                        )}
                    />
                </Segment>
            </Container>
        );
    }
}

export default ItemForm
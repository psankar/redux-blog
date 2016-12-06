import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { createPost } from '../actions/index';

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
    <div>
        <label>Content</label>
        <div>
            <textarea {...input} placeholder="Content" rows="10" cols="40"></textarea>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class PostsNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props);
    }

    render() {
        const { handleSubmit, title, categories, content } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title" component={renderInput} label="Title" type="text" {...title} />
                <Field name="categories" component={renderInput} label="Categories" type="text" {...categories} />
                <Field name="content" component={renderTextArea} {...content} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required';
    }
    if (!values.categories) {
        errors.categories = 'Required';
    }
    console.log("######", values);
    console.log("@@@@", values.content);
    if (!values.content) {
        errors.content = 'Content cannot be empty';
    } else if (values.content.length < 3) {
        errors.content = 'Content should be more than 3 characters';
    }

    return errors;
}

export default reduxForm({
    form: 'NewPostForm',
    validate
})(PostsNew);
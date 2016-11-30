import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { createPost } from '../actions/index';

class PostsNew extends Component {

    render() {
        const { handleSubmit, title, categories, content } = this.props;
        return (
            <form onSubmit={handleSubmit(createPost)}>
                <Field name="title" component="input" type="text" placeholder="Title" {...title} />
                <Field name="categories" component="input" type="text" placeholder="Categories" {...categories} />
                <Field name="content" component="textarea" placeholder="Content" {...content} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}


export default reduxForm({
    form: 'NewPostForm'
})(PostsNew);
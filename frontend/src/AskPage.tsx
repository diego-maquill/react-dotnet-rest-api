import React, { useState, FC } from 'react';
import { Page } from './Page';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';
import { postQuestion } from './QuestionsData';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import { isPropertySignature } from 'typescript';

export const AskPage = () => {

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    setRedirect(true);
    if (!question) {
      return { success: false }
    } else {
      return { success: true }
    }
    //return { success: question ? true : false };
  };
  if (redirect) { return <Redirect from="/home" to="/" /> }

  return (
    <Page title="Ask a Question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 20 }],
        }}
        onSubmit={handleSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};
export default AskPage;

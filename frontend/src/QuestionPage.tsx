import { FC, useState, Fragment, FormEvent, useEffect } from 'react';
import { Page } from './Page';
import { RouteComponentProps, Redirect } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
//import { gray3, gray6 } from './Styles';
import { AnswerList } from './AnswerList';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';
import { HubConnectionBuilder, HubConnectionState, HubConnection } from '@aspnet/signalr';
import { server } from './AppSettings';
import { useAuth } from './Auth';
import { QuestionData, getQuestion, postAnswer, deleteAnswer, mapQuestionFromServer, QuestionDataFromServer, } from './QuestionsData';
import "./Style/QuestionPage.css"

interface RouteParams {
  questionId: string;
}
export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const { isAuthenticated } = useAuth();
  ////////////////////////////////////////////////////////////////////
  const setUpSignalRConnection = async (questionId: number) => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${server}/questionshub`)
      .withAutomaticReconnect()
      .build();
    connection.on('Message', (message: string) => {
      console.log('Message', message);
    });
    connection.on('ReceiveQuestion', (question: QuestionDataFromServer) => {
      console.log('ReceiveQuestion', question);
      setQuestion(mapQuestionFromServer(question));
    });
    async function start() {
      try {
        await connection.start();
      } catch (err) {
        console.log(err);
      }
    }
    await start();

    if (connection.state === HubConnectionState.Connected) {
      connection.invoke('SubscribeQuestion', questionId).catch((err: Error) => {
        return console.error(err.toString());
      });
    }

    return connection;
  };
  //////////////////////////////
  const cleanUpSignalRConnection = (
    questionId: number,
    connection: HubConnection,
  ) => {
    if (connection.state === HubConnectionState.Connected) {
      connection
        .invoke('UnsubscribeQuestion', questionId)
        .then(() => {
          connection.off('Message');
          connection.off('ReceiveQuestion');
          connection.stop();
        })
        .catch((err: Error) => {
          return console.error(err.toString());
        });
    } else {
      connection.off('Message');
      connection.off('ReceiveQuestion');
      connection.stop();
    }
  };

  useEffect(() => {
    let cancelled = false;
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      if (!cancelled) {
        setQuestion(foundQuestion);
      }
    };
    let connection: HubConnection;
    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
      setUpSignalRConnection(questionId).then(con => {
        connection = con;
      });
    }
    return function cleanUp() {
      cancelled = true;
      if (match.params.questionId) {
        const questionId = Number(match.params.questionId);
        cleanUpSignalRConnection(questionId, connection);
      }
    };
  }, [match.params.questionId]);

  const [redirect, setRedirect] = useState(false);
  const [answer, setAnswer] = useState(false);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    setRedirect(true);
    return { success: result ? true : false };
  };
  if (redirect) window.location.reload();

  const handleDelete = async (questionId: number) => {
    const eraseAnswer = await deleteAnswer(questionId);
    if (!answer) {
      return eraseAnswer;
    }
  };


  return (
    <Page>
      <div id="frame1" >
        <div id="frame2" >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p id="fragment1" >
              {question.content}
            </p>
            <div id="question1">
              {`Asked by ${question.userName} on
              ${question.created.toLocaleDateString()}
              ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            {isAuthenticated && (
              <div id="aythentication" >
                {/*     ///////////////////////////////// */}
                <Form
                  submitCaption="Submit Your Answer"
                  validationRules={{
                    content: [
                      { validator: required },
                      { validator: minLength, arg: 10 },
                    ],
                  }}
                  onSubmit={handleSubmit}
                  failureMessage="There was a problem with your answer"
                  successMessage="Your answer was successfully submitted" >
                  <Field name="content" label="Your Answer" type="TextArea" />
                </Form>
                {/* ///////////////////////////////// */}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Page>
  );
};

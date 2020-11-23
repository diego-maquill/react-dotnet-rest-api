import { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionData } from './QuestionsData';
import { gray2, gray3 } from './Styles';
import { Link } from 'react-router-dom';
import "./Style/Question.css";

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question: FC<Props> = ({ data, showContent = true }) => (
  <div id="box1">
    <div id="box2" >
      <Link
        id="box3"
        to={`questions/${data.questionId}`} >
        {data.title}
      </Link>
    </div>
    {showContent && (
      <div id="preview" >
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div id="loggedInfo" >
      {`Asked by ${data.userName} on
        ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);

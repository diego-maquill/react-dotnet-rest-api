import { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AnswerData } from './QuestionsData';
import { gray3 } from './Styles';
import "./Style/Answer.css"

interface Props {
  data: AnswerData;
}
export const Answer: FC<Props> = ({ data }) => (
  <div id="answerData" >
    <div id="data1"   >
      {data.content}
    </div>
    <div id="data2">
      {`Answered by ${data.userName} on
      ${data.created.toLocaleDateString()} 
      ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
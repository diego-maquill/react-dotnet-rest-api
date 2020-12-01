import { FC } from 'react';
import { AnswerData } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Answer } from './Answer';
//import { gray5 } from './Styles';
import "./Style/AnswerList.css"

interface Props {
  data: AnswerData[];
}

export const AnswerList: FC<Props> = ({ data }) => (
  <ul >
    {data.map(answer => (
      <li id="data"
        key={answer.answerId} >
        <Answer data={answer} />
      </li>
    ))}
  </ul>
);

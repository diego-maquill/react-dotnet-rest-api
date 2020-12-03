import { FC } from 'react';
import { AnswerData } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Answer } from './Answer';
//import { gray5 } from './Styles';
import "./Style/AnswerList.css"

interface Props {
  data: AnswerData[];
  onDelete: (answer: AnswerData) => void;
}

export const AnswerList: FC<Props> = ({ data, onDelete }) => (
  <ul >
    {data.map(answer => (
      <li id="data" key={answer.answerId} >
        <Answer onDelete={onDelete} data={answer} />
      </li>
    ))}
  </ul>
);

import { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PageTitle } from './PageTitle';
import "./Style/Page.css";

interface Props {
  title?: string;
}
export const Page: FC<Props> = ({ title, children }) => (
  <div id="page1" >
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);

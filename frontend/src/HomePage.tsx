import { ChangeEvent, FormEvent, useEffect, useState, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { searchQuestions, getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import "./Style/Page.css"
import { PageTitle } from './PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from './Auth';
import "./Style/HomePage.css";
import "./Style/search.css"
//import { SearchBody, SearchWithRouter as Search } from './Searchbody'

export const HomePage: FC<RouteComponentProps> = ({ history, location }) => {

  const searchParams1 = new URLSearchParams(location.search);
  const criteria = searchParams1.get('criteria') || '';

  const [search1, setSearch] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search1}`);
  };

  ////////////////////////////////////////////////////////////////

  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetUnansweredQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <PageTitle>Welcome</PageTitle>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 ">
          <div id="search1">
            <form onSubmit={handleSearchSubmit}>
              <input
                id="box"
                type="text"
                placeholder="Search..."
                onChange={handleSearchInputChange}
                value={search1} />
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 ">
          <div id="page" >
            {isAuthenticated && (
              <PrimaryButton onClick={handleAskQuestionClick}>
                Ask a question
              </PrimaryButton>
            )}
          </div>
          {questionsLoading ? (
            <div id="questionLoading" >
              Loading...
            </div>
          ) : (
              <QuestionList data={questions || []} />
            )}
        </div>
      </div>
    </Page>
  );
};

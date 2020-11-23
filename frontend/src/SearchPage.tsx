import { ChangeEvent, FormEvent, FC, useState, useEffect } from 'react';
import { RouteComponentProps,  Link, withRouter } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestions, QuestionData } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
//import { useAuth } from './Auth';
import "./Style/search.css"

export const SearchPage: FC<RouteComponentProps> = ({ history, location }) => {

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

  ///////////////////////////////////

  const [questions, setQuestions] = useState<QuestionData[]>([]);

 /*  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';
 */
 // const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      if (!cancelled) {
        setQuestions(foundResults);
      }
    };
    doSearch(search1);
    return () => {
      cancelled = true;
    };
  }, [search1]);

  return (
    <Page title="Search Results">
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
        <div>
          {search1 && (<p id="results" > for "{search1}"  </p> )}
          <QuestionList data={questions} />
        </div>
      </div>
      </div>
    </Page>
  );
};

import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { UserIcon } from './Icons';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { useAuth } from './Auth';
import "./Style/Header.css";

export const Header: FC<RouteComponentProps> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';

  const [search, setSearch] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  const { isAuthenticated, user, loading } = useAuth();

  return (
    <div id="header" >
      <Link
        id="link"
        to="/" >
        Q & A
      </Link>
      {!loading && (isAuthenticated ? (
        <ul id="inforightlist3">
          <li id="userName">  {user!.name}</li>
          <UserIcon />
          <Link
            id="signOut"
            to={{ pathname: '/signout', state: { local: true } }} >
            SignOut
          </Link>
        </ul>
      ) : (
          <ul id="inforightlist2">
            <UserIcon />
            <Link
              id="signIn"
              to="/signin" >
              Sign In
            </Link>
          </ul>
        ))}
    </div>
  );
};

export const HeaderWithRouter = withRouter(Header);

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getRoutePath, Router } from '../router';

export const App: React.FC = () => {
  return (
    <SWrap>
      <SHeader>
        <SNav>
          <ul>
            <li>
              <SNavLink to={getRoutePath('InterviewCalendar')}>
                Interview calendar
              </SNavLink>
            </li>
            <li>
              <SNavLink to={getRoutePath('About')}>About</SNavLink>
            </li>
          </ul>
        </SNav>
      </SHeader>
      <SMain>
        <Router />
      </SMain>
    </SWrap>
  );
};

const SWrap = styled.div`
  margin: 0 auto;
`;

const SMain = styled.main`
  padding: 10px;
`;

const SHeader = styled.header`
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkslategray;
`;

const SNav = styled.nav`
  & > ul {
    list-style: none;
    display: flex;
    gap: 20px;
    align-items: center;

    & > li {
      //background-color: aqua;
    }
  }
`;

const SNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bbb;

  &.active {
    color: white;
    font-weight: 500;
  }
`;

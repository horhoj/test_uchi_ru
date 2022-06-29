import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { InterviewCalendarPage } from '../pages/InterviewCalendarPage';
import { AboutPage } from '../pages/AboutPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['InterviewCalendar', 'About', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  InterviewCalendar: {
    path: '/',
    component: InterviewCalendarPage,
  },

  About: {
    path: 'about',
    component: AboutPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};

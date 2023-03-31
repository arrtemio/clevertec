import { FC, ReactComponentElement, ReactElement } from 'react';

export interface IRoute {
  path: string;
  element: ReactComponentElement<FC> | ReactElement
}

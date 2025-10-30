import type { ComponentType } from 'react';

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    hidden?: boolean;
    component: ComponentType
  }[];
}


export type ApiError = {
  status?: number;
  data?: {
    success?: boolean;
    message?: string;
  };
};


export type TRole = "driver" | "admin" | "rider";
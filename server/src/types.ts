import express from 'express';

export enum METHOD {
    GET = 'get',
    POST = 'post',
};

export enum DBField {
    CARDS = 'cards',
    USERS = 'users',
    SELECT_ITEMS = 'select_items',
    RESULT_ITEM = 'result_item' 
};


export type Handler = (
    req: express.Request,
    res: express.Response,
  ) => void;

  
export interface CustomRoute {
    method: METHOD;
    route: string;
    handler: Handler | Array<Handler>;
};

export interface Card {
    id: string
    imgUrl: string
};

export interface User {
    key:number;
    title: string;
    id: string;
    password: string;
    
};


export interface SelectItem {
    question: string;
    select_1: string;
    select_2: string;
};

export interface SelectItems {
    [key:number]: SelectItem[]
};

export interface ResultItem {
    id: string;
    who:string;
    content:string;
};

export interface ResultItems {
    [key:number]: ResultItem[]
};
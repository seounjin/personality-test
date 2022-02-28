import express from 'express';

export enum METHOD {
    GET = 'get',
    POST = 'post',
};

export enum DBField {
    CARDS = 'cards',
};

export interface CustomRoute {
    method: METHOD
    route: string
    handler: (req: express.Request, res: express.Response) => void
};

export interface Card {
    id: string
    img: string
};
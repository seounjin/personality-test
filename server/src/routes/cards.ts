import { CustomRoute, METHOD, DBField, Card } from '../types';
import { readDB } from '../db/dbController';

const getCards = (): Card[] => readDB(DBField.CARDS);

const cardsRoute : CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/cards',
        handler: (req, res) => {
            const msgs = getCards();
            res.send(msgs);
        }
    },
];

export default cardsRoute;

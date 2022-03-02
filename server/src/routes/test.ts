import { CustomRoute, METHOD, DBField, User, SelectItems, ResultItems, Card } from '../types';
import { readDB } from '../db/dbController';

const getUsers = (): User[] => readDB(DBField.USERS);
const getSelectItems = (): SelectItems[] => readDB(DBField.SELECT_ITEMS);

const testRoute : CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/test/:id',
        handler: (req, res) => {
            const id = parseInt(req.params.id);
            const userData = getUsers().filter((data) => data.key === id);
            const { title } = userData[0];
            const selectItems = getSelectItems();
            const selectItem = selectItems[0][id];
            console.log("확인", title, selectItem, id, selectItems);

            // return res.status(200).json( { success: true, testData: } );
        }
    },
];

export default testRoute;

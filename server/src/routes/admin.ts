import { CustomRoute, METHOD, DBField, User, SelectItems, ResultItems, Card } from '../types';
import { readDB, writeDB } from '../db/dbController';

const multer = require('multer');
const path = require('path');

const getUsers = (): User[] => readDB(DBField.USERS);
const setUsers = (data: User[]) => writeDB(DBField.USERS, data);

const getSelectItems = (): SelectItems[] => readDB(DBField.SELECT_ITEMS);
const setSelectItems = (data: SelectItems[]) => writeDB(DBField.SELECT_ITEMS, data);

const getResultItems = (): ResultItems[] => readDB(DBField.RESULT_ITEM);
const setResultItems = (data: ResultItems[]) => writeDB(DBField.RESULT_ITEM, data);

const getCards = (): Card[] => readDB(DBField.CARDS);
const setCards = (data:Card[]) => writeDB(DBField.CARDS, data);

const storage = multer.diskStorage({
    destination: 'src/public/images/',
    filename: (req: any, file: any, cb: any) => {
        const imgFile = "imgfile" + Date.now() + path.extname(file.originalname);
        const cardData = getCards();
        setCards([...cardData, {id:String(cardData.length + 1), imgUrl:`http://localhost:8000/static/images/${imgFile}`}]);
      cb(null, imgFile);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
}).any();

const adminRoute : CustomRoute[] = [
    {
        method: METHOD.POST,
        route: '/admin',
        handler: [upload, ({ body }, res) => {

            try {
                
                const user = JSON.parse(body.user);
                const items = JSON.parse(body.items);
                const result = JSON.parse(body.result);

                // user data
                const users = getUsers();
                const userData = { 
                    ...user, 
                    key:users.length + 1 
                };
                setUsers([...users, userData]);
                
                // select data
                const selectData = getSelectItems();
                const selectKey = Object.keys(selectData[0]).length;
                setSelectItems([{...selectData[0],[selectKey + 1]: items}]);
                

                // result data
                const resultData = getResultItems();
                const resultKey = Object.keys(resultData[0]).length;
                setResultItems([{...resultData[0],[resultKey + 1]: result}]);

            } catch (error) {
                console.log("error", error);
            }
            
            // const msgs = getMsgs()
            // res.send(msgs);
        }
    ]
    },
];

export default adminRoute;

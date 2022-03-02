import { CustomRoute, METHOD, DBField, User, SelectItems, ResultItems, Card } from '../types';
import { readDB, writeDB } from '../db/dbController';
import express from 'express';

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
    filename: (req: express.Request, file: any, cb: (error: Error | null, filename: string) => void) => {
        const imgFile = "imgfile" + Date.now() + path.extname(file.originalname);
        const cardData = getCards();
        setCards([...cardData, {id:String(cardData.length + 1), imgUrl:`http://localhost:8000/static/images/${imgFile}`}]);
      cb(null, imgFile);
    }
});

const fileFilter = (req:express.Request, file:any, cb:(error:string | null, state: boolean) => void) => {	
    const fileType  = path.extname(file.originalname);
    
    if(fileType  !== '.png' && fileType  !== '.jpg' && fileType !== 'jpeg'){
        return cb('jpg jpeg png 파일만 업로드 가능합니다.', false);
    } 
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } //크기 제한 : 10MB
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

                return res.status(200).json( { success: true } );


            } catch (error) {
                console.log("에러", error);
                return res.status(400).json( { success: false, error } );
            }
        }
    ]
    },
];

export default adminRoute;

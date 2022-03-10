import { CustomRoute, METHOD, DBField, User, SelectItems, ResultItems, Card } from '../types';
import { readDB } from '../db/dbController';

const { authentication } = require('../utils/authentication');

const getCards = (): Card[] => readDB(DBField.CARDS);
const getSelectItems = (): SelectItems[] => readDB(DBField.SELECT_ITEMS);
const getResultItems = (): ResultItems[] => readDB(DBField.RESULT_ITEM);

const testRoute : CustomRoute[] = [
    {
        method: METHOD.GET,
        route: '/test/:id',
        handler: (req, res) => {
            try {

                const id = parseInt(req.params.id);
                const selectItems = getSelectItems();
                const selectItem = selectItems[0][id];

                const cardData = getCards().filter((data) => data.id === `${id}`);
                const { title } = cardData[0];

                return res.status(200).json( { success: true, testData: selectItem, title: title} );
            
            } catch (error) {
                console.log("error", error);
                return res.status(400).json( { success: false, error: error } );
            }
            
        }
    },

    {
        method: METHOD.GET,
        route: '/test',
        handler: (req, res) => {
            try {
                const id = req.query.id as string;
                const { result } = req.query;


                const resultItems = getResultItems();
                const resultData = resultItems[0][id].filter((data) => data.id === result);
                
                return res.status(200).json( { success: true, resultData: resultData } );
            
            } catch (error) {
                console.log("error", error);
                return res.status(400).json( { success: false, error: error } );
            }
            
        }
    },
    {
        method: METHOD.POST,
        route: '/test',
        handler: ({body:{userId, password, cardId}}, res) => {
            try {
                
                console.log("바디", userId, password, cardId);

                // 아이디 비번 일치하는지 확인
                if(!authentication(userId, password, cardId)){
                    return res.status(200).json( { success: false } );
                }

                const cardData = getCards().filter((data) => data.id !== cardId);
                console.log("카드데이터", cardData);

                const resultItems = getResultItems();
                delete resultItems['2'];
                console.log("resultItems", resultItems);

                return res.status(200).json( { success: true } );
            
            } catch (error) {
                console.log("error", error);
                return res.status(400).json( { success: false, error: error } );
            }
            
        }
    },
];

export default testRoute;

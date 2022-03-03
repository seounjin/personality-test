import { CustomRoute, METHOD, DBField, User, SelectItems, ResultItems, Card } from '../types';
import { readDB } from '../db/dbController';

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

                return res.status(200).json( { success: true, testData: selectItem } );
            
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

                console.log("결과1", req.query)

                const resultItems = getResultItems();
                const resultData = resultItems[0][id].filter((data) => data.id === result);
                
                return res.status(200).json( { success: true, resultData: resultData } );
            
            } catch (error) {
                console.log("error", error);
                return res.status(400).json( { success: false, error: error } );
            }
            
        }
    },
];

export default testRoute;

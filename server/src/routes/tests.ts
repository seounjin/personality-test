import {
  CustomRoute,
  METHOD,
  DBField,
  User,
  SelectItem,
  ResultItem,
  Card,
} from "../types";
import { readDB, writeDB } from "../db/dbController";
import express from "express";

const { authentication } = require("../utils/authentication");

const multer = require("multer");
const path = require("path");

const getUsers = (): User[] => readDB(DBField.USERS);
const setUsers = (data: User[]) => writeDB(DBField.USERS, data);

const getSelectItems = (): SelectItem[] => readDB(DBField.SELECT_ITEMS);
const setSelectItems = (data: SelectItem[]) =>
  writeDB(DBField.SELECT_ITEMS, data);

const getResultItems = (): ResultItem[] => readDB(DBField.RESULT_ITEM);
const setResultItems = (data: ResultItem[]) =>
  writeDB(DBField.RESULT_ITEM, data);

const getCards = (): Card[] => readDB(DBField.CARDS);
const setCards = (data: Card[]) => writeDB(DBField.CARDS, data);

const storage = multer.diskStorage({
  destination: "src/public/images/",
  filename: (
    req: express.Request,
    file: any,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const imgFile = "imgfile" + Date.now() + path.extname(file.originalname);
    const cardData = getCards();
    const user = JSON.parse(req.body.user);
    setCards([
      ...cardData,
      {
        id: cardData.length + 1,
        imgUrl: `http://localhost:8000/static/images/${imgFile}`,
        title: user["title"],
      },
    ]);
    cb(null, imgFile);
  },
});

const fileFilter = (
  req: express.Request,
  file: any,
  cb: (error: string | null, state: boolean) => void
) => {
  const fileType = path.extname(file.originalname);

  if (fileType !== ".png" && fileType !== ".jpg" && fileType !== "jpeg") {
    return cb("jpg jpeg png 파일만 업로드 가능합니다.", false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, //크기 제한 : 10MB
}).any();

const testRoute: CustomRoute[] = [
  {
    method: METHOD.GET,
    route: "/api/v1/tests/:id",
    handler: (req, res) => {
      try {
        const id = parseInt(req.params.id);
        console.log("카드아이디", id);
        const selectData = getSelectItems().filter((data) => data.key === id);
        if (selectData.length === 0) {
          return res.sendStatus(404);
        }

        const cardData = getCards().filter((data) => data.id === id);
        const { title } = cardData[0];

        return res.status(200).json({ testData: selectData, title: title });
      } catch (error) {
        console.log("error", error);
        return res.sendStatus(500);
      }
    },
  },

  {
    method: METHOD.GET,
    route: "/api/v1/tests/:testId/results/:resultId",
    handler: (req, res) => {
      try {
        const testId = req.params.testId as string;
        const resultId = req.params.resultId;

        const resultData = getResultItems()
          .filter((data) => data.key === parseInt(testId))
          .filter((data) => data.id === resultId);

        return res.status(200).json({ resultData: resultData });
      } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: error });
      }
    },
  },

  {
    method: METHOD.POST, // 삭제
    route: "/api/v1/tests/:testId/delete",
    handler: (req, res) => {
      try {
        const { userId, password } = req.body;
        const cardId = parseInt(req.params.testId);
        console.log("삭제", userId, password, cardId);

        // 아이디 비번 일치하는지 확인
        if (!authentication(userId, password, cardId)) {
          return res.status(401).json({ success: false });
        }

        const cardData = getCards().filter((data) => data.id !== cardId);
        console.log("!!!", cardData);
        setCards(cardData);

        const resultItems = getResultItems().filter(
          (data) => data.key !== cardId
        );
        setResultItems(resultItems);

        const selectItem = getSelectItems().filter(
          (data) => data.key !== cardId
        );
        setSelectItems(selectItem);

        const useItem = getUsers().filter((data) => data.key !== cardId);
        setUsers(useItem);

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log("error", error);
        return res.status(401).json({ success: false, error: error });
      }
    },
  },

  {
    method: METHOD.POST, //등록
    route: "/api/v1/tests",
    handler: [
      upload,
      ({ body }, res) => {
        try {
          const user = JSON.parse(body.user);
          const items = JSON.parse(body.items);
          const result = JSON.parse(body.results);

          // user data
          const users = getUsers();

          const key = users.length + 1;

          const userData = {
            ...user,
            key: key,
          };
          setUsers([...users, userData]);

          // select data
          const selectData = getSelectItems();
          const newSelectItem = items.map((data: SelectItem) => {
            return { ...data, key: key };
          });

          setSelectItems([...selectData, ...newSelectItem]);

          // result data
          const resultData = getResultItems();
          const newResultData = result.map((data: ResultItem) => {
            return { ...data, key: key };
          });

          setResultItems([...resultData, ...newResultData]);

          return res.status(201).json({ success: true });
        } catch (error) {
          console.log("에러", error);
          return res.status(400).json({ success: false, error });
        }
      },
    ],
  },

  {
    method: METHOD.GET,
    route: "/api/v1/tests/:testId/edit",
    handler: (req, res) => {
      if (!req.session.cardId) {
        console.log("인증실패");
        return res.sendStatus(403);
      }
      const testId = parseInt(req.params.testId);
      if (req.session.cardId !== testId) {
        console.log("인증실패");
        return res.sendStatus(403);
      }

      try {
        const { imgUrl } = getCards().filter((data) => data.id === testId)[0];

        const useItem = getUsers().filter((data) => data.key === testId)[0];

        const selectData = getSelectItems()
          .filter((data) => data.key === testId)
          .map((data, index) => {
            const { question, select_1, select_2 } = data;
            return {
              question: question,
              select_1: select_1,
              select_2: select_2,
            };
          });

        const resultItems = getResultItems().filter(
          (data) => data.key === testId
        );

        console.log("수정 데이터 요청", testId);

        return res
          .status(200)
          .json({
            success: true,
            userItem: useItem,
            items: selectData,
            resultContent: resultItems,
            imgUrl: imgUrl,
          });
      } catch (error) {
        console.log("에러", error);
        return res.status(404).json({ success: false, error });
      }
    },
  },
  {
    method: METHOD.POST,
    route: "/api/v1/tests/:testId/edit-page",
    handler: (req, res) => {
      try {
        const { userId, password } = req.body;
        const cardId = parseInt(req.params.testId);
        console.log("수정 아이디 비번 체크", userId, password, cardId);

        // 아이디 비번 일치하는지 확인
        if (!authentication(userId, password, cardId)) {
          return res.status(401).json({ success: false });
        }
        req.session.cardId = cardId;

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log("error", error);
        return res.status(400).json({ success: false, error });
      }
    },
  },

  {
    // 수정요청
    method: METHOD.POST,
    route: "/api/v1/tests/:testId/edit",
    handler: [
      upload,
      ({ body }, res) => {
        try {
          console.log("바디", body);

          return res.status(200).json({ success: false });
        } catch (error) {
          console.log("error", error);
          return res.status(400).json({ success: false, error: error });
        }
      },
    ],
  },
];

export default testRoute;

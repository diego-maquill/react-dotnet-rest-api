import { http } from './http';
import { getAccessToken } from './Auth';
/* 
GET/SEARCH SECTION
*/
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface QuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface AnswerDataFromServer {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export const mapQuestionFromServer = (
  question: QuestionDataFromServer,
): QuestionData => ({
  ...question,
  created: new Date(question.created),
  answers: question.answers
    ? question.answers.map(answer => ({
      ...answer,
      created: new Date(answer.created),
    }))
    : [],
});

export const mapAnswerFromServer = (
  answer: AnswerDataFromServer,
): AnswerData => ({
  ...answer,
});


export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: '/qanda/unanswered-questions',
    });
    if (result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (ex) {
    return [];
  }
};

export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  try {
    const result = await http<undefined, QuestionDataFromServer>({
      path: `/qanda/questions/${questionId}`,
    });
    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: `/qanda/questions?search=${criteria}`,
    });
    if (result.ok && result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (ex) {
    return [];
  }
};
/* 

POST SECTION

*/
export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<PostQuestionData, QuestionDataFromServer>({
      path: '/qanda/questions',
      method: 'post',
      body: question,
      accessToken,
    });
    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return undefined;
    }
  } catch (ex) {
    return undefined;
  }
};
export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<PostAnswerData, AnswerData>({
      path: '/qanda/answer',
      method: 'post',
      body: answer,
      accessToken,
    });
    if (result.ok) {
      return result.parsedBody;
    } else {
      return undefined;
    }
  } catch (ex) {
    return undefined;
  }
};

/*

UPDATE SECTION

*/
///////////////////////////////////////

////////////////////////////////////////////
/*
DELETE SECTION
*/
///////////////////////////////////////////
export const deleteAnswer = async (
  answerId: number,
): Promise<AnswerData | null> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<undefined, AnswerData>({
      path: `/delete?answer=${answerId}`,
      method: `delete`,
      accessToken,
    });
    if (result.parsedBody) {
      return result.parsedBody
      //return result.parsedBody.map(mapAnswerFromServer);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
};
//////////////////////////////////////////////
export const deleteQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<undefined, QuestionDataFromServer>({
      path: `/delete?question=${questionId}`,
      method: `delete`,
      accessToken,
    });
    if (result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
      //return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
};
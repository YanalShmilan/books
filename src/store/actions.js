export const ADD_MEMBER = 'ADD_MEMBER';
export const ADD_BOOK = 'ADD_BOOK';
export const RETURN_BOOK = 'RETURN_BOOK';
export const BORROW_BOOK = 'BORROW_BOOK';

export const addMember = (member) => {
  return {
    type: ADD_MEMBER,
    payload: { member },
  };
};
export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: { book },
  };
};
export const returnBook = (bookId) => {
  return {
    type: RETURN_BOOK,
    payload: { bookId },
  };
};
export const borrowBook = (bookId, userId) => {
  return {
    type: BORROW_BOOK,
    payload: { bookId, userId },
  };
};

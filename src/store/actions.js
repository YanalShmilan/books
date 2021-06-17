export const ADD_MEMBER = 'ADD_MEMBER';
export const ADD_BOOK = 'ADD_BOOK';
export const RETURN_BOOK = 'RETURN_BOOK';
export const BORROW_BOOK = 'BORROW_BOOK';
export const EDIT_MEMBER = 'EDIT_MEMBER';
export const DELETE_MEMBER = 'DELETE_MEMBER';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

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

export const editMemberAction = (member) => {
  return {
    type: EDIT_MEMBER,
    payload: { member },
  };
};
export const deleteMember = (memberId) => {
  return {
    type: DELETE_MEMBER,
    payload: { memberId },
  };
};
export const editBookAction = (book) => {
  return {
    type: EDIT_BOOK,
    payload: { book },
  };
};
export const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    payload: { bookId },
  };
};

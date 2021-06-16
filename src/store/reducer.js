import slugify from 'slugify';
import members from '../members';
import books from '../books';
import { ADD_MEMBER, ADD_BOOK, RETURN_BOOK, BORROW_BOOK } from './actions';
const initialState = {
  members: members,
  books: books,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      let newMember = action.payload.member;
      newMember.id = state.members[state.members.length - 1].id + 1;
      newMember.slug = slugify(`${newMember.firstName} ${newMember.lastName}`);
      return {
        ...state,
        members: [...state.members, action.payload.member],
      };
    case ADD_BOOK:
      let newBook = action.payload.book;
      newBook.id = state.books[state.books.length - 1].id + 1;
      newBook.slug = slugify(`${newBook.title}`);
      return {
        ...state,
        books: [...state.books, action.payload.book],
      };
    case RETURN_BOOK:
      let returnedBook = state.books.find(
        (book) => book.id === action.payload.bookId
      );
      const memberId =
        returnedBook.borrowedBy[returnedBook.borrowedBy.length - 1];

      let newBooks = state.books.map((book) => {
        if (book.id === returnedBook.id) {
          returnedBook.available = !returnedBook.available;
          return returnedBook;
        } else {
          return book;
        }
      });
      let newMembers = state.members.map((member) => {
        if (member.id === memberId) {
          member.currentlyBorrowedBooks = member.currentlyBorrowedBooks.filter(
            (book) => book !== returnedBook.id
          );
          return member;
        } else return member;
      });
      return {
        ...state,
        books: newBooks,
        members: newMembers,
      };
    case BORROW_BOOK:
      const borrowedBook = state.books.find(
        (book) => book.id === action.payload.bookId
      );
      const borrowedUser = state.members.find(
        (member) => member.id === action.payload.userId
      );
      let newBookss = state.books.map((book) => {
        if (book.id === borrowedBook.id) {
          borrowedBook.available = !borrowedBook.available;
          book.borrowedBy.push(borrowedUser.id);
          return borrowedBook;
        } else {
          return book;
        }
      });
      let newMemberss = state.members.map((member) => {
        if (member.id === borrowedUser.id) {
          member.currentlyBorrowedBooks.push(borrowedBook.id);
          return member;
        } else return member;
      });
      console.log(newMemberss);
      return {
        ...state,
        books: newBookss,
        members: newMemberss,
      };

    default:
      return state;
  }
};

export default reducer;

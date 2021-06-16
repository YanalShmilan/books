import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { returnBook, borrowBook } from '../store/actions';

const BooksDetails = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();
  let members = useSelector((state) => state.members);
  let books = useSelector((state) => state.books);

  let bookToFind = books.find((book) => book.slug === slug);
  let borrowedMembers = bookToFind.borrowedBy
    .map((bookId) => {
      if (members.find((member) => member.id === bookId)) {
        return members.find((member) => member.id === bookId);
      }
    })
    .map((member) => (
      <li>
        <Link to={`/members/${member.slug}`}>{member.firstName}</Link>
      </li>
    ));
  let eligibleMembers = members
    .filter((member) => {
      if (
        member.membership === 'silver' &&
        member.currentlyBorrowedBooks.length < 2
      ) {
        return member;
      } else if (
        member.membership === 'gold' &&
        member.currentlyBorrowedBooks.length < 3
      ) {
        return member;
      } else if (
        member.membership === 'platinum' &&
        member.currentlyBorrowedBooks.length < 5
      ) {
        return member;
      } else {
      }
    })
    .map((member) => (
      <li>
        {member.firstName}
        <button onClick={() => dispatch(borrowBook(bookToFind.id, member.id))}>
          Borrow
        </button>
      </li>
    ));
  console.log(eligibleMembers);

  const setView = () => {
    if (!bookToFind.available) {
      return (
        <div>
          The book is currently borrowed by :{' '}
          {borrowedMembers[borrowedMembers.length - 1]}-
          <button onClick={() => dispatch(returnBook(bookToFind.id))}>
            Return book
          </button>
        </div>
      );
    } else {
      console.log(eligibleMembers);
      return <div> {eligibleMembers}</div>;
    }
  };
  return (
    <div>
      <li>Title: {bookToFind.title}</li>
      <li>Author: {bookToFind.author}</li>
      <li>Genre: {bookToFind.genre}</li>
      <li>Available: {bookToFind.available ? 'Yes' : 'No'}</li>
      <li>Borrowed By: {borrowedMembers}</li>
      {setView()}
    </div>
  );
};

export default BooksDetails;

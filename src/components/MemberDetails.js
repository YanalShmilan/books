import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { returnBook, borrowBook } from '../store/actions';
import { useDispatch } from 'react-redux';

const MemberDetails = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();
  let members = useSelector((state) => state.members);
  let books = useSelector((state) => state.books);

  let memberDetail = members.find((member) => member.slug === slug);
  let borrowdBooks = memberDetail.currentlyBorrowedBooks
    .map((bookId) => {
      if (books.find((book) => book.id === bookId)) {
        return books.find((book) => book.id === bookId);
      }
    })
    .map((book) => (
      <li>
        {book.title} -
        <button onClick={() => dispatch(returnBook(book.id))}>
          return book
        </button>
      </li>
    ));
  console.log(borrowdBooks);
  return (
    <div>
      <li>
        {memberDetail.firstName} {memberDetail.lastName}
      </li>
      <li>MemberShip: {memberDetail.membership}</li>
      <ul>
        {borrowdBooks.length > 0
          ? borrowdBooks
          : 'This member borrowed no books'}
      </ul>
    </div>
  );
};
export default MemberDetails;

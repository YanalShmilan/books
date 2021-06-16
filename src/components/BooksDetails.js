import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { returnBook, borrowBook } from '../store/actions';

const BooksDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      <div>
        <Link to={`/members/${member.slug}`}>{member.firstName}</Link>
      </div>
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
        {'    '}
        <button onClick={() => dispatch(borrowBook(bookToFind.id, member.id))}>
          Borrow
        </button>
      </li>
    ));

  const setView = () => {
    if (!bookToFind.available) {
      return (
        <p>
          The book is currently borrowed by :
          {borrowedMembers[borrowedMembers.length - 1]}
          <button onClick={() => dispatch(returnBook(bookToFind.id))}>
            Return book
          </button>
        </p>
      );
    } else {
      return <span> {eligibleMembers}</span>;
    }
  };
  return (
    <center>
      <div className="book-detail">
        <figure class="book">
          <ul class="hardcover_front">
            <li>
              <img src={bookToFind.img} alt="" width="100%" height="100%" />
            </li>
            <li></li>
          </ul>

          <ul class="page">
            <li></li>
            <li>
              <a className="btn" href="">
                {bookToFind.available ? (
                  <span style={{ color: 'green' }}>available</span>
                ) : (
                  <span style={{ color: 'red' }}>Not available</span>
                )}
              </a>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <ul class="hardcover_back">
            <li></li>
            <li></li>
          </ul>
          <ul class="book_spine">
            <li></li>
            <li></li>
          </ul>
          <figcaption>
            <h1>{bookToFind.title}</h1>
            <span>By {bookToFind.author}</span>
            <span>Genre: {bookToFind.genre.toString().split(' ')}</span>
            <p>
              Status:{' '}
              {bookToFind.available ? (
                <span style={{ color: 'green' }}>available</span>
              ) : (
                <span style={{ color: 'red' }}>Not available</span>
              )}
            </p>
            <span>Borrowed Before By: {borrowedMembers}</span>
            <span className="cont">
              <ul className="members-elig">{setView()}</ul>
            </span>
            <br />
            <button onClick={() => history.goBack()}>Go Back</button>
          </figcaption>
        </figure>
      </div>
    </center>
  );
};

export default BooksDetails;

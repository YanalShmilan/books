import { Link } from 'react-router-dom';

const BookItem = (props) => {
  const book = props.book;
  return (
    <center>
      <figure class="book">
        <ul class="hardcover_front">
          <li>
            <img src={book.img} alt="" width="100%" height="100%" />
          </li>
          <li></li>
        </ul>

        <ul class="page">
          <li></li>
          <li>
            <Link className="btn" to={`/books/${book.slug}`}>
              Details
            </Link>
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
          <h1>{book.title}</h1>
          <span>By {book.author}</span>
          <p>
            {book.available ? (
              <span style={{ color: 'green' }}>Available</span>
            ) : (
              <span style={{ color: 'red' }}>Not Available</span>
            )}
          </p>
        </figcaption>
      </figure>
    </center>
  );
};
export default BookItem;

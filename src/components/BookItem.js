const BookItem = (props) => {
  return (
    <div>
      <center>
        <figure class="book">
          <ul class="hardcover_front">
            <li>
              <img
                src="https://m.media-amazon.com/images/I/51X-uVznafL.jpg"
                alt=""
                width="100%"
                height="100%"
              />
            </li>
            <li></li>
          </ul>

          <ul class="page">
            <li></li>
            <li>
              <a class="btn" href="#">
                Download
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
            <h1>Papelucho Perdido</h1>
            <span>By Marcela Paz</span>
            <p>
              Fennel bamboo shoot pea sprouts rutabaga parsnip green bean gram
              wattle seed lentil horseradish nori. Grape lettuce turnip greens.
            </p>
          </figcaption>
        </figure>
      </center>
    </div>
  );
};
export default BookItem;

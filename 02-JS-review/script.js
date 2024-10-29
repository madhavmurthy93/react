const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: ["fantasy", "high-fantasy", "adventure", "fiction", "novels", "literature"],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: ["science fiction", "humor", "speculative fiction", "short stories", "fantasy"],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// Destructuring
const book = getBook(1);

const {
  author,
  title,
  pages,
  publicationDate,
  genres: [primaryGenre, secondaryGenre, ...otherGenres],
} = book;
console.log(author, title, primaryGenre, secondaryGenre, otherGenres);

// Rest and spread operators
const newGengres = [primaryGenre, secondaryGenre, "new genre", ...otherGenres];
console.log(newGengres);

const updatedBook = { ...book, moviePublicationDate: "2001-12-19", pages: 1210 };
console.log(updatedBook);

// Template literals
const summary = `${title} is a book with ${pages} pages written by ${author} published in ${
  publicationDate.split("-")[0]
}.`;
console.log(summary);

// Ternaries instead of if/else statements
pages > 1000 ? console.log("More than 1000 pages") : console.log("Less than 1000 pages");
const adapted = `${title} has ${book.hasMovieAdaptation ? "" : "not "}been adapted into a movie.`;
console.log(adapted);

// Arrow functions
const getPublicationYear = (publicationDate) => publicationDate.split("-")[0];
console.log(getPublicationYear(publicationDate));

// Short circuiting and logical operators
console.log(book.hasMovieAdaptation && "This book has a movie adaptation.");

console.log(book.translations.spanish ?? "No Spanish translation available."); // Nullish coalescing operator

// Optional chaining
function getTotalReviewCount(book) {
  const goodread = book.reviews.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodread + librarything;
}

console.log(getTotalReviewCount(book));

// Array map method
const books = getBooks();
const bookTitles = books.map((book) => book.title);
console.log(bookTitles);

const essentialBookInfo = books.map((book) => {
  const { title, author, genres, reviews } = book;
  return { title, author, genres, reviews };
});
console.log(essentialBookInfo);

// Array filter method
const longBooks = books.filter((book) => book.pages > 1000);
console.log(longBooks);

const hasSpanishTranslation = books.filter((book) => book.translations.spanish);
console.log(hasSpanishTranslation);

const longBooksWithMovieAdaption = books
  .filter((book) => book.pages > 1000)
  .filter((book) => book.hasMovieAdaptation);
console.log(longBooksWithMovieAdaption);

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);
console.log(adventureBooks);

// Array reduce method
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
console.log(pagesAllBooks);

// Array sort method
const sortedBooks = books
  .slice()
  .sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate))
  .map((book) => book.title);
console.log(sortedBooks);

// Working with immutable arrays
const newBook = {
  id: 6,
  title: "The Hobbit",
  publicationDate: "1937-09-21",
  author: "George R. R. Martin",
  genres: ["fantasy", "high-fantasy", "adventure", "fiction", "novels", "literature"],
  hasMovieAdaptation: true,
  pages: 310,
};
const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 2);
console.log(booksAfterDelete);

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, title: "The Lord of the Rings: The Fellowship of the Ring" } : book
);
console.log(booksAfterUpdate);

// Promises
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Async/await
async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
}

console.log(await fetchTodos());
console.log("jonas");

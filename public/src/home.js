
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}


function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);
  return [borrowed, returned];
}


function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return { ...borrow, ...account };
  });
  return borrowers.slice(0, 10);
}


function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  return borrowedBooks.length;
}


function getMostCommonGenres(books) {
  const genres = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sortedGenres = Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return sortedGenres.slice(0, 5);
}



function getMostPopularBooks(books) {
  const sortedBooks = books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  return sortedBooks.map((book) => ({ name: book.title, count: book.borrows.length })).slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  const authorCounts = authors.reduce((acc, author) => {
    const count = books.reduce((count, book) => {
      if (book.authorId === author.id) {
        count += book.borrows.length;
      }
      return count;
    }, 0);
    acc.push({ name: `${author.name.first} ${author.name.last}`, count });
    return acc;
  }, []);
  const sortedAuthors = authorCounts.sort((authorA, authorB) => authorB.count - authorA.count);
  return sortedAuthors.slice(0, 5);
}


function sortObjectPropertiesByValues(obj) {
  const sortedObj = {};
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  values.sort((a, b) => b - a);
  keys.forEach((key) => {
    const valueIndex = values.indexOf(obj[key]);
    sortedObj[key] = obj[key];
    values.splice(valueIndex, 1);
  });
  return Object.entries(sortedObj);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

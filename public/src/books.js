function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const notBorrowed = books.filter((book) => book.borrows[0].returned === true);
  return [borrowed, notBorrowed];
}

function getBorrowersForBook(book, accounts) {
  const borrowHistory = book.borrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return {...borrow, ...account};
  });
  return borrowHistory.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

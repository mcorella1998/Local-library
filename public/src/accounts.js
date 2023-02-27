function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => account1.name.last.localeCompare(account2.name.last));
}


function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((acc, book) => {
    const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
    return acc + borrowCount;
  }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books
    .filter(book => book.borrows.some(borrow => borrow.id === accountId && !borrow.returned))
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return {...book, author};
    });
}                         
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

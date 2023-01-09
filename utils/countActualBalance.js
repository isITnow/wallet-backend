const countActualBalance = (amount, balance, type) => {
  return type === 'income'
    ? (balance + Math.abs(amount)).toFixed(2)
    : (balance - Math.abs(amount)).toFixed(2);
}

module.exports = countActualBalance
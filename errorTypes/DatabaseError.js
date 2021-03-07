class DatabaseError extends Error {
  constructor(message, error, status = 500) {
    super(message);
    this.type = 'DatabaseError';
    this.error = error;
    this.status = status;
  }
}

module.exports = DatabaseError;

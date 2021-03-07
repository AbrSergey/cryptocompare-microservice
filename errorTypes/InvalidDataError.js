class InvalidDataError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.type = 'InvalidDataError';
    this.status = status;
  }
}

module.exports = InvalidDataError;

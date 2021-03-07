class InternalError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.type = 'InternalError';
    this.status = status;
  }
}

module.exports = InternalError;

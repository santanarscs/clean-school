export class PastDateError extends Error {
  public readonly name = 'PastDateError';

  constructor(date: string) {
    super(`The date: ${date} is in the past.`);
  }
}

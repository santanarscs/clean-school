export class ExistingSubjectError extends Error {
  public readonly name = 'ExistingSubjectError';

  constructor() {
    super('Subject already exist.');
  }
}

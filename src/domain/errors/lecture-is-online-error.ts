export class LectureIsOnlineError extends Error {
  public readonly name = 'LectureIsOnlineError';

  constructor(name: string) {
    super(
      `You can't create a meeting because it is a online lecture (${name}).`,
    );
  }
}

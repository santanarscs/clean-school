export class TeacherNotAvailableToLectureError extends Error {
  public readonly name = 'TeacherNotAvailableToLectureError';

  constructor(teacher: string, lecture: string) {
    super(`The teacher: ${teacher} is not available to lecture: ${lecture}.`);
  }
}

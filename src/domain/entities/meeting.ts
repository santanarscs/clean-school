import { Either, left, right } from '@/core/domain/entities';
import { isBefore } from 'date-fns';
import { Group, Lecture, Name, Teacher, Container } from '.';
import {
  InvalidNameError,
  TeacherNotAvailableToLectureError,
  PastDateError,
  LectureIsOnlineError,
  ExistingElementError,
} from '../errors';

interface ICreateMeetingData {
  name: string;
  lecture: Lecture;
  teacher: Teacher;
  startDate: Date;
  endDate: Date;
}

export class Meeting {
  private readonly groups: Container<Group> = new Container<Group>();

  private constructor(
    private readonly _name: Name,
    private readonly lecture: Lecture,
    private readonly teacher: Teacher,
    private readonly startDate: Date,
    private readonly endDate: Date,
  ) {}

  get name() {
    return this._name;
  }

  get numberOfGroups(): number {
    return this.groups.numberOfElements;
  }

  add(group: Group): Either<ExistingElementError, void> {
    return this.groups.add(group);
  }

  includes(group: Group): boolean {
    return this.groups.includes(group);
  }

  remove(group: Group): void {
    this.groups.remove(group);
  }

  static create(
    data: ICreateMeetingData,
  ): Either<
    | InvalidNameError
    | TeacherNotAvailableToLectureError
    | LectureIsOnlineError
    | PastDateError,
    Meeting
  > {
    const nameOrError = Name.create(data.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;

    const teacher = Teacher.create({
      name: data.teacher.name.value,
      subjects: data.teacher.subjects,
    }).value as Teacher;

    if (!teacher.validateAvailableToTeach(data.lecture.subject)) {
      return left(
        new TeacherNotAvailableToLectureError(
          teacher.name.value,
          data.lecture.name.value,
        ),
      );
    }
    if (data.lecture.isOnline) {
      return left(new LectureIsOnlineError(data.lecture.name.value));
    }

    if (isBefore(data.startDate, Date.now())) {
      return left(new PastDateError(data.startDate.toString()));
    }

    const { lecture, startDate, endDate } = data;

    return right(new Meeting(name, lecture, teacher, startDate, endDate));
  }
}

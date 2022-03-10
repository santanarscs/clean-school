import { Either, left, right } from '@/core/domain/entities';
import { Subject } from '.';
import { InvalidNameError } from '../errors';
import { Name } from './name';

interface ICreateLectureData {
  name: string;
  subject: Subject;
  isOnline: boolean;
}
export class Lecture {
  private constructor(
    private readonly _name: Name,
    private readonly _subject: Subject,
    private readonly _isOnline: boolean,
  ) {}

  get name() {
    return this._name;
  }

  get subject(): Subject {
    return this._subject;
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  static create(data: ICreateLectureData): Either<InvalidNameError, Lecture> {
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    const { subject, isOnline } = data;
    return right(new Lecture(name, subject, isOnline));
  }

  equals(other: Lecture) {
    return (
      this.name === other.name &&
      this._subject === other._subject &&
      this.isOnline === other.isOnline
    );
  }
}

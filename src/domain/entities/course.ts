import { Either, left, right } from '@/core/domain/entities';
import { InvalidNameError } from '../errors/invalid-name-error';
import { Name } from '.';

interface ICreateCourseData {
  name: string;
}

export class Course {
  private constructor(private _name: Name) {}

  get name() {
    return this._name;
  }

  static create(data: ICreateCourseData): Either<InvalidNameError, Course> {
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    return right(new Course(name));
  }
}

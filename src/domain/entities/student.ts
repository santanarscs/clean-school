import { Either, left, right } from '@/core/domain/entities';
import { Element, Name } from '.';
import { InvalidNameError } from '../errors';

interface ICreateStudent {
  name: string;
}
export class Student implements Element {
  private constructor(private readonly _name: Name) {}

  get name() {
    return this._name;
  }

  equals(other: Student): boolean {
    return this.name === other.name;
  }

  static create(data: ICreateStudent): Either<InvalidNameError, Student> {
    const nameOrError = Name.create(data.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    return right(new Student(name));
  }
}

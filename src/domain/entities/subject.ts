import { Either, left, right } from '@/core/domain/entities';
import { Element, Name } from '.';
import { InvalidNameError } from '../errors';

interface ICreateSubjectData {
  name: string;
}
export class Subject implements Element {
  private constructor(private readonly _name: Name) {}

  get name() {
    return this._name;
  }

  equals(item: Subject): boolean {
    return this.name === item.name;
  }

  static create(data: ICreateSubjectData): Either<InvalidNameError, Subject> {
    const nameOrError = Name.create(data.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    return right(new Subject(name));
  }
}

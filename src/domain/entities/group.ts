import { Either, left, right } from '@/core/domain/entities';
import { Student, Name, Container, Element } from '.';
import { ExistingElementError, InvalidNameError } from '../errors';

interface ICreateGroupData {
  name: string;
}
export class Group implements Element {
  private readonly students: Container<Student> = new Container<Student>();

  private constructor(private readonly _name: Name) {}

  get name() {
    return this._name;
  }

  get numberOfStudents() {
    return this.students.numberOfElements;
  }

  add(student: Student): Either<ExistingElementError, void> {
    return this.students.add(student);
  }

  includes(student: Student): boolean {
    return this.students.includes(student);
  }

  remove(student: Student) {
    return this.students.remove(student);
  }

  equals(other: Group): boolean {
    return this.name.value === other.name.value;
  }

  static create(data: ICreateGroupData): Either<InvalidNameError, Group> {
    const nameOrError = Name.create(data.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    return right(new Group(name));
  }
}

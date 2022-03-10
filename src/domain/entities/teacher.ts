import { Either, left, right } from '@/core/domain/entities';
import { Container, Subject } from '.';
import { ExistingElementError, InvalidNameError } from '../errors';
import { Name } from './name';

interface ICreateTeacherData {
  name: string;
  subjects?: Subject[];
}
export class Teacher {
  private readonly _subjects: Container<Subject> = new Container<Subject>();

  private constructor(private readonly _name: Name) {}

  get name() {
    return this._name;
  }

  get subjects(): Subject[] {
    return this._subjects.elements;
  }

  get numberOfSubjects(): number {
    return this._subjects.numberOfElements;
  }

  add(subject: Subject): Either<ExistingElementError, void> {
    return this._subjects.add(subject);
  }

  includes(subject: Subject): boolean {
    return this._subjects.includes(subject);
  }

  remove(subject: Subject): void {
    this._subjects.remove(subject);
  }

  static create(data: ICreateTeacherData): Either<InvalidNameError, Teacher> {
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;

    const teacher = new Teacher(name);

    if (data.subjects) {
      data.subjects.forEach(subject => {
        teacher.add(subject);
      });
    }

    return right(teacher);
  }

  validateAvailableToTeach(subject: Subject) {
    if (!this.numberOfSubjects) {
      return false;
    }

    return this.includes(subject);
  }
}

import { Either, left, right } from '@/core/domain/entities';
import { Lecture, Element, Container, Name } from '.';
import { ExistingElementError, InvalidNameError } from '../errors';

interface ICreateChapterData {
  name: string;
}

export class Chapter implements Element {
  private readonly lectures: Container<Lecture> = new Container<Lecture>();

  private constructor(private readonly _name: Name) {}

  get name() {
    return this._name;
  }

  get numberOfLectures(): number {
    return this.lectures.numberOfElements;
  }

  equals(other: Chapter) {
    return this.name === other.name;
  }

  add(lecture: Lecture): Either<ExistingElementError, void> {
    return this.lectures.add(lecture);
  }

  includes(lecture: Lecture): boolean {
    return this.lectures.includes(lecture);
  }

  move(lecture: Lecture, position: number): void {
    this.lectures.move(lecture, position);
  }

  position(lecture: Lecture): number {
    return this.lectures.position(lecture) as number;
  }

  remove(lecture: Lecture): void {
    this.lectures.remove(lecture);
  }

  static create(data: ICreateChapterData): Either<InvalidNameError, Chapter> {
    const nameOrError = Name.create(data.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    return right(new Chapter(name));
  }
}

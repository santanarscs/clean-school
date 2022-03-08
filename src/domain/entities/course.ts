import { Either, left, right } from '@/core/domain/entities';
import { InvalidNameError } from '../errors/invalid-name-error';
import { Name, Container, Chapter } from '.';
import { ExistingElementError } from '../errors';

interface ICreateCourseData {
  name: string;
  description: string;
}

export class Course {
  private readonly chapters: Container<Chapter> = new Container<Chapter>();

  private constructor(private _name: Name, private _description: string) {}

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get numberOfChapters(): number {
    return this.chapters.numberOfElements;
  }

  add(chapter: Chapter): Either<ExistingElementError, void> {
    return this.chapters.add(chapter);
  }

  includes(chapter: Chapter): boolean {
    return this.chapters.includes(chapter);
  }

  move(chapter: Chapter, position: number): void {
    this.chapters.move(chapter, position);
  }

  position(chapter: Chapter): number {
    return this.chapters.position(chapter) as number;
  }

  remove(chapter: Chapter): void {
    this.chapters.remove(chapter);
  }

  static create(data: ICreateCourseData): Either<InvalidNameError, Course> {
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    const name = nameOrError.value as Name;
    const { description } = data;
    return right(new Course(name, description));
  }
}

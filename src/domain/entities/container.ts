import { Either, left, right } from '@/core/domain/entities';
import { Element } from '.';
import { ExistingElementError } from '../errors';

export class Container<T extends Element> {
  private readonly elements: T[] = [];

  get numberOfElements(): number {
    return this.elements.length;
  }

  add(element: T): Either<ExistingElementError, void> {
    if (!this.includes(element)) return right(this.push(element));

    return left(new ExistingElementError());
  }

  private push(element: T): void {
    this.elements.push(element);
  }

  includes(element: T): boolean {
    return this.elements.find(p => p.equals(element) === true) !== undefined;
  }

  move(element: T, to: number): void {
    if (to > this.elements.length || to < 1) return;
    const from = this.position(element) as number;
    this.moveInArray(from - 1, to - 1);
  }

  position(element: T): number | undefined {
    const partInContainer = this.elements.find(p => p.equals(element));
    if (partInContainer === undefined) {
      return undefined;
    }
    return this.elements.indexOf(partInContainer) + 1;
  }

  remove(element: T): void {
    if (!this.includes(element)) return;
    const positionInArray = this.position(element) as number;
    this.elements.splice(positionInArray - 1, 1);
  }

  moveInArray(from: number, to: number): void {
    const element = this.elements.splice(from, 1)[0];
    this.elements.splice(to, 0, element);
  }
}

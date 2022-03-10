import { Either, left, right } from '@/core/domain/entities';
import { Element } from '.';
import { ExistingElementError } from '../errors';

export class Container<T extends Element> {
  private readonly _elements: T[] = [];

  get numberOfElements(): number {
    return this._elements.length;
  }

  get elements(): T[] {
    return this._elements;
  }

  add(element: T): Either<ExistingElementError, void> {
    if (!this.includes(element)) return right(this.push(element));

    return left(new ExistingElementError());
  }

  private push(element: T): void {
    this._elements.push(element);
  }

  includes(element: T): boolean {
    return this._elements.find(p => p.equals(element) === true) !== undefined;
  }

  move(element: T, to: number): void {
    if (to > this._elements.length || to < 1) return;
    const from = this.position(element) as number;
    this.moveInArray(from - 1, to - 1);
  }

  position(element: T): number | undefined {
    const partInContainer = this._elements.find(p => p.equals(element));
    if (partInContainer === undefined) {
      return undefined;
    }
    return this._elements.indexOf(partInContainer) + 1;
  }

  remove(element: T): void {
    if (!this.includes(element)) return;
    const positionInArray = this.position(element) as number;
    this._elements.splice(positionInArray - 1, 1);
  }

  moveInArray(from: number, to: number): void {
    const element = this._elements.splice(from, 1)[0];
    this._elements.splice(to, 0, element);
  }
}

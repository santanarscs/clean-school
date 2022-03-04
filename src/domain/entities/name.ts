import { Either, left, right } from '@/core/domain/entities';
import { InvalidNameError } from '../errors/invalid-name-error';

export class Name {
  constructor(private _value: string) {}

  public static create(value: string): Either<InvalidNameError, Name> {
    if (!Name.validate(value)) {
      return left(new InvalidNameError(value));
    }
    return right(new Name(value));
  }

  get value() {
    return this._value;
  }

  private static validate(value: string): boolean {
    if (!value) {
      return false;
    }
    if (value.trim().length < 2 || value.trim().length > 256) {
      return false;
    }
    return true;
  }
}

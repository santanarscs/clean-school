import { Entity } from '@/core/domain/entities';
import { InvalidNameError } from '../errors/invalid-name-error';

type CourseProps = {
  name: string;
};

export class Course extends Entity<CourseProps> {
  private constructor(props: CourseProps, id?: string) {
    super(props, id);
  }

  static create({ name }: CourseProps, id?: string): Course | InvalidNameError {
    if (name.trim().length < 3 || name.trim().length > 256) {
      return new InvalidNameError(name);
    }
    const course = new Course({ name }, id);
    return course;
  }
}

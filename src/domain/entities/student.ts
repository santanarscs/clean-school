import { Entity } from '@/core/domain/entities';

type StudentProps = {
  name: string;
};
export class Student extends Entity<StudentProps> {
  private constructor(props: StudentProps, id?: string) {
    super(props, id);
  }

  static create({ name }: StudentProps, id?: string): Student {
    const student = new Student({ name }, id);
    return student;
  }
}

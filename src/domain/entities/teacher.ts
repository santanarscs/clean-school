import { Entity } from '@/core/domain/entities';
import { Subject } from '.';

type TeacherProps = {
  name: string;
  subjects?: Subject[];
};
export class Teacher extends Entity<TeacherProps> {
  private constructor(props: TeacherProps, id?: string) {
    super(props, id);
  }

  static create({ name }: TeacherProps, id?: string): Teacher {
    const teacher = new Teacher({ name }, id);
    return teacher;
  }

  public enableSubject(subject: Subject): void {
    if (this.props.subjects) {
      this.props.subjects.push(subject);
    } else {
      this.props.subjects = [subject];
    }
  }
}

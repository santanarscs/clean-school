import { Entity } from '@/core/domain/entities';
import { Student } from '.';

type GroupProps = {
  name: string;
  students?: Student[];
};
export class Group extends Entity<GroupProps> {
  private constructor(props: GroupProps, id?: string) {
    super(props, id);
  }

  static create({ name }: GroupProps, id?: string): Group {
    const group = new Group({ name }, id);
    return group;
  }

  public addStudent(student: Student) {
    if (this.props.students) {
      this.props.students.push(student);
    } else {
      this.props.students = [student];
    }
  }

  public removeStudent(student: Student) {
    if (this.props.students)
      this.props.students = this.props.students.filter(
        item => item !== student,
      );
  }
}

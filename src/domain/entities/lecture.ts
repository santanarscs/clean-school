import { Entity } from '@/core/domain/entities';
import { Subject } from '.';

type LectureProps = {
  name: string;
  subject: Subject;
  isOnline: boolean;
};
export class Lecture extends Entity<LectureProps> {
  private constructor(props: LectureProps, id?: string) {
    super(props, id);
  }

  static create(
    { name, subject, isOnline }: LectureProps,
    id?: string,
  ): Lecture {
    const lecture = new Lecture({ name, subject, isOnline }, id);
    return lecture;
  }

  equals(other: Lecture) {
    return (
      this.props.name === other.props.name &&
      this.props.subject === other.props.subject &&
      this.props.isOnline === other.props.isOnline
    );
  }
}

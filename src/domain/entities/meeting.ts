import { Entity } from '@/core/domain/entities';
import { Group, Lecture, Teacher } from '.';
import { InvalidNameError } from '../errors/invalid-name-error';
import { TeacherNotAvailableToLectureError } from '../errors/teacher-not-available-lecture-error';

type MeetingProps = {
  name: string;
  groups: Group[];
  lecture: Lecture;
  teacher: Teacher;
  startDate: Date;
  endDate: Date;
};

export class Meeting extends Entity<MeetingProps> {
  private constructor(props: MeetingProps, id?: string) {
    super(props, id);
  }

  static create(
    { name, groups, lecture, teacher, startDate, endDate }: MeetingProps,
    id?: string,
  ): Meeting | InvalidNameError | TeacherNotAvailableToLectureError {
    if (name.trim().length < 3 || name.trim().length > 256) {
      return new InvalidNameError(name);
    }

    const meeting = new Meeting(
      { name, groups, lecture, teacher, startDate, endDate },
      id,
    );

    if (!meeting.isTeacherAvailableToLecture()) {
      return new TeacherNotAvailableToLectureError(
        teacher.props.name,
        lecture.props.name,
      );
    }

    return meeting;
  }

  private isTeacherAvailableToLecture(): boolean {
    if (!this.props.teacher.props.subjects) {
      return false;
    }

    return !!this.props.teacher.props.subjects?.filter(
      subject =>
        subject.props.name === this.props.lecture.props.subject.props.name,
    ).length;
  }
}

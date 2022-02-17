import { Entity } from '@/core/domain/entities';
import { Course, Subject, Teacher } from '.';

type LessonProps = {
  name: string;
  course: Course;
  teacher: Teacher;
  subject: Subject;
  startDate: Date;
  finishDate: Date;
};

export class Lesson extends Entity<LessonProps> {
  private constructor(props: LessonProps, id?: string) {
    super(props, id);
  }

  static create(props: LessonProps, id?: string) {
    const lesson = new Lesson(props, id);
    return lesson;
  }
}

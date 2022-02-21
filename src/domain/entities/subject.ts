import { Entity } from '@/core/domain/entities';

type SubjectProps = {
  name: string;
};
export class Subject extends Entity<SubjectProps> {
  private constructor(props: SubjectProps, id?: string) {
    super(props, id);
  }

  static create({ name }: SubjectProps, id?: string): Subject {
    const subject = new Subject({ name }, id);
    return subject;
  }
}

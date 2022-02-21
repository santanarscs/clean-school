import { Teacher, Subject } from '@/domain/entities';

describe('Teacher domain Entity', () => {
  it('should be able to create teacher with valid name', () => {
    const name = 'Teacher 1';
    const teacher = Teacher.create({ name }) as Teacher;
    expect(teacher.props.name).toEqual(name);
  });

  it('should be able to enable a subject for a teacher', () => {
    const nameSubject = 'Subject';
    const nameTeacher = 'Teacher 1';
    const subject = Subject.create({ name: nameSubject }) as Subject;
    const teacher = Teacher.create({ name: nameTeacher }) as Teacher;
    teacher.enableSubject(subject);
    expect(teacher.props.subjects).toHaveLength(1);
  });
  it('should be able to enable many subjects for a teacher', () => {
    const nameTeacher = 'Teacher 1';
    const subject1 = Subject.create({ name: 'Subject 1' }) as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }) as Subject;
    const teacher = Teacher.create({ name: nameTeacher }) as Teacher;
    teacher.enableSubject(subject1);
    teacher.enableSubject(subject2);
    expect(teacher.props.subjects).toHaveLength(2);
  });
});

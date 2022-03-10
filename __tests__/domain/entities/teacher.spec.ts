import { Teacher, Subject } from '@/domain/entities';

describe('Teacher domain Entity', () => {
  it('should be not create teacher with min invalid length name', () => {
    const invalidName = 'T   ';

    const error = Teacher.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be able to create teacher with valid name', () => {
    const name = 'Teacher 1';
    const teacher = Teacher.create({ name }).value as Teacher;
    expect(teacher.name.value).toEqual(name);
  });

  it('should be able to enable a subject for a teacher', () => {
    const nameSubject = 'Subject';
    const nameTeacher = 'Teacher 1';
    const subject = Subject.create({ name: nameSubject }).value as Subject;
    const teacher = Teacher.create({ name: nameTeacher }).value as Teacher;
    teacher.add(subject);
    expect(teacher.numberOfSubjects).toEqual(1);
  });

  it('should be able to enable many subjects for a teacher', () => {
    const nameTeacher = 'Teacher 1';
    const subject1 = Subject.create({ name: 'Subject 1' }).value as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }).value as Subject;
    const teacher = Teacher.create({ name: nameTeacher }).value as Teacher;
    teacher.add(subject1);
    teacher.add(subject2);
    expect(teacher.numberOfSubjects).toEqual(2);
  });

  it('should be able to remove subject', () => {
    const nameTeacher = 'Teacher 1';
    const subject1 = Subject.create({ name: 'Subject 1' }).value as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }).value as Subject;
    const teacher = Teacher.create({ name: nameTeacher }).value as Teacher;
    teacher.add(subject1);
    teacher.add(subject2);

    teacher.remove(subject2);
    expect(teacher.numberOfSubjects).toEqual(1);
  });
});

import { Lecture, Subject } from '@/domain/entities';

describe('Lecture domain Entity', () => {
  it('should be not create course with min invalid length name', () => {
    const invalidName = 'C   ';
    const isOnline = true;
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const error = Lecture.create({ name: invalidName, isOnline, subject })
      .value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be create chapter with valid name', () => {
    const name = 'Lecture 1';
    const isOnline = true;
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({ name, isOnline, subject })
      .value as Lecture;
    expect(lecture.name.value).toEqual(name);
    expect(lecture.isOnline).toEqual(true);
  });
});

import { Lecture, Subject } from '@/domain/entities';

describe('Lecture domain Entity', () => {
  it('should be create chapter with valid name', () => {
    const name = 'Lecture 1';
    const isOnline = true;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({ name, isOnline, subject }) as Lecture;
    expect(lecture.props.name).toEqual(name);
    expect(lecture.props.isOnline).toEqual(true);
  });
});

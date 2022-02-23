import { Group, Lecture, Meeting, Subject, Teacher } from '@/domain/entities';

describe('Meeting domain Entity', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });
  });
  it('should be create a meeting with valid data', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    teacher.enableSubject(subject);
    const meeting = Meeting.create({
      name,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }) as Meeting;

    expect(meeting.props.name).toEqual(name);
  });
  it('should be not create a meeting with invalid name', () => {
    const invalidName = 'M                 ';
    const subject = Subject.create({ name: 'Subject 1' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    teacher.enableSubject(subject);

    const error = Meeting.create({
      name: invalidName,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }) as Error;

    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create a meeting if teacher not available any subject', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    const error = Meeting.create({
      name,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }) as Error;

    expect(error.name).toEqual('TeacherNotAvailableToLectureError');
    expect(error.message).toEqual(
      `The teacher: ${teacher.props.name} is not available to lecture: ${lecture.props.name}.`,
    );
  });

  it('should be not create a meeting if teacher not available to subject', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const subject2 = Subject.create({ name: 'Subject 2' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    teacher.enableSubject(subject2);
    const error = Meeting.create({
      name,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }) as Error;

    expect(error.name).toEqual('TeacherNotAvailableToLectureError');
    expect(error.message).toEqual(
      `The teacher: ${teacher.props.name} is not available to lecture: ${lecture.props.name}.`,
    );
  });

  it('should be not create a meeting if lecture is online', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const subject2 = Subject.create({ name: 'Subject 2' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: true,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    teacher.enableSubject(subject);
    teacher.enableSubject(subject2);

    const error = Meeting.create({
      name,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }) as Error;

    expect(error.name).toEqual('LectureIsOnlineError');
    expect(error.message).toEqual(
      `You can't create a meeting because it is a online lecture (${lecture.props.name}).`,
    );
  });
  it('should be not create a meeting if past date', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const subject2 = Subject.create({ name: 'Subject 2' });
    const groups = [Group.create({ name: 'Group 1' })];
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const teacher = Teacher.create({ name: 'Teacher 1' });
    teacher.enableSubject(subject);
    teacher.enableSubject(subject2);

    const error = Meeting.create({
      name,
      groups,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 10),
      endDate: new Date(2022, 4, 10, 11),
    }) as Error;

    expect(error.name).toEqual('PastDateError');
    expect(error.message).toEqual(
      `The date: ${new Date(2022, 4, 10, 10)} is in the past.`,
    );
  });
});

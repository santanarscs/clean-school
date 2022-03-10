import { Group, Lecture, Meeting, Subject, Teacher } from '@/domain/entities';

describe('Meeting domain Entity', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });
  });
  it('should be create a meeting with valid data', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    const meeting = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Meeting;

    expect(meeting.name.value).toEqual(name);
  });
  it('should be not create a meeting with invalid name', () => {
    const invalidName = 'M                 ';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;

    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);

    const error = Meeting.create({
      name: invalidName,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Error;

    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create a meeting if teacher not available any subject', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    const error = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Error;

    expect(error.name).toEqual('TeacherNotAvailableToLectureError');
    expect(error.message).toEqual(
      `The teacher: ${teacher.name.value} is not available to lecture: ${lecture.name.value}.`,
    );
  });

  it('should be not create a meeting if teacher not available to subject', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }).value as Subject;

    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject2);
    const error = Meeting.create({
      name,

      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Error;

    expect(error.name).toEqual('TeacherNotAvailableToLectureError');
    expect(error.message).toEqual(
      `The teacher: ${teacher.name.value} is not available to lecture: ${lecture.name.value}.`,
    );
  });

  it('should be not create a meeting if lecture is online', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }).value as Subject;

    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: true,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    teacher.add(subject2);

    const error = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Error;

    expect(error.name).toEqual('LectureIsOnlineError');
    expect(error.message).toEqual(
      `You can't create a meeting because it is a online lecture (${lecture.name.value}).`,
    );
  });

  it('should be not create a meeting if past date', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const subject2 = Subject.create({ name: 'Subject 2' }).value as Subject;

    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    teacher.add(subject2);

    const error = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 10),
      endDate: new Date(2022, 4, 10, 11),
    }).value as Error;

    expect(error.name).toEqual('PastDateError');
    expect(error.message).toEqual(
      `The date: ${new Date(2022, 4, 10, 10)} is in the past.`,
    );
  });

  it('should be able to add a group in meeting', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    const meeting = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Meeting;
    const group = Group.create({ name: 'Group' }).value as Group;

    meeting.add(group);

    expect(meeting.numberOfGroups).toBe(1);
  });

  it('should not be able to add a group in meeting with duplicate name', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    const meeting = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Meeting;
    const group = Group.create({ name: 'Group' }).value as Group;

    meeting.add(group);
    meeting.add(group);

    expect(meeting.numberOfGroups).toBe(1);
  });

  it('should be able return true if exist group in meeting', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    const meeting = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Meeting;
    const group = Group.create({ name: 'Group' }).value as Group;

    meeting.add(group);
    expect(meeting.includes(group)).toBeTruthy();
  });

  it('should be able to remove group', () => {
    const name = 'Meeting 1';
    const subject = Subject.create({ name: 'Subject 1' }).value as Subject;
    const lecture = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    }).value as Lecture;
    const teacher = Teacher.create({ name: 'Teacher 1' }).value as Teacher;
    teacher.add(subject);
    const meeting = Meeting.create({
      name,
      lecture,
      teacher,
      startDate: new Date(2022, 4, 10, 13),
      endDate: new Date(2022, 4, 10, 14),
    }).value as Meeting;
    const group1 = Group.create({ name: 'Group 1' }).value as Group;
    const group2 = Group.create({ name: 'Group 2' }).value as Group;

    meeting.add(group1);
    meeting.add(group2);

    meeting.remove(group2);
    expect(meeting.numberOfGroups).toEqual(1);
  });
});

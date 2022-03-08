import { Chapter, Lecture, Subject } from '@/domain/entities';

describe('Chapter domain Entity', () => {
  it('should be not create chapter with min invalid length name', () => {
    const invalidName = 'C   ';

    const error = Chapter.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create course with max invalid length name', () => {
    const invalidName = 'C'.repeat(257);

    const error = Chapter.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });
  it('should be able to create chapter with valid name', () => {
    const name = 'Chapter 1';
    const chapter = Chapter.create({ name }).value as Chapter;
    expect(chapter.name.value).toEqual(name);
  });

  it('should be able to add a lecture for a chapter', () => {
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    const chapter = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    chapter.add(lecture);
    expect(chapter.numberOfLectures).toEqual(1);
  });

  it('should not be able to add a lecture with duplicate name in a chapter', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    chapter.add(lecture);
    chapter.add(lecture);
    expect(chapter.numberOfLectures).toEqual(1);
  });

  it('should be able return true if exist lecture in chapter', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    chapter.add(lecture);

    expect(chapter.includes(lecture)).toBeTruthy();
  });

  it('should be able to add many lectures for a chapter', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      isOnline: true,
      subject,
    }) as Lecture;
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      isOnline: true,
      subject,
    }) as Lecture;
    chapter.add(lecture1);
    chapter.add(lecture2);

    expect(chapter.numberOfLectures).toEqual(2);
  });

  it('should not be able to move negative lecture position ', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      subject,
      isOnline: false,
    });
    const lecture3 = Lecture.create({
      name: 'Lecture 3',
      subject,
      isOnline: false,
    });

    chapter.add(lecture1);
    chapter.add(lecture2);
    chapter.add(lecture3);

    chapter.move(lecture1, 0);
    expect(chapter.position(lecture1)).toBe(1);
  });
  it('should not be able to move a position higher than lectures', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      subject,
      isOnline: false,
    });
    const lecture3 = Lecture.create({
      name: 'Lecture 3',
      subject,
      isOnline: false,
    });

    chapter.add(lecture1);
    chapter.add(lecture2);
    chapter.add(lecture3);

    chapter.move(lecture2, 10);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(2);
    expect(chapter.position(lecture3)).toBe(3);
  });
  it('should be able to move a lecture position', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      subject,
      isOnline: false,
    });
    const lecture3 = Lecture.create({
      name: 'Lecture 3',
      subject,
      isOnline: false,
    });

    chapter.add(lecture1);
    chapter.add(lecture2);
    chapter.add(lecture3);

    chapter.move(lecture2, 3);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(3);
    expect(chapter.position(lecture3)).toBe(2);
  });
  it('should not be able to move a lecture position if not exist', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      subject,
      isOnline: false,
    });
    const lecture3 = Lecture.create({
      name: 'Lecture 3',
      subject,
      isOnline: false,
    });

    chapter.add(lecture1);
    chapter.add(lecture2);

    chapter.move(lecture3, 1);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(2);
  });

  it('should be able to remove chapter', () => {
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture1 = Lecture.create({
      name: 'Lecture 1',
      subject,
      isOnline: false,
    });
    const lecture2 = Lecture.create({
      name: 'Lecture 2',
      subject,
      isOnline: false,
    });
    const lecture3 = Lecture.create({
      name: 'Lecture 3',
      subject,
      isOnline: false,
    });

    chapter.add(lecture1);
    chapter.add(lecture2);
    chapter.add(lecture3);

    chapter.remove(lecture2);
    expect(chapter.numberOfLectures).toEqual(2);
  });
});

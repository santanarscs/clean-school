import { Chapter, Lecture, Subject } from '@/domain/entities';

describe('Chapter domain Entity', () => {
  it('should be able to create chapter with valid name', () => {
    const name = 'Chapter 1';
    const chapter = Chapter.create(name) as Chapter;
    expect(chapter.name).toEqual(name);
  });

  it('should be able to equals chapter with same name', () => {
    const name = ' Chapter';
    const chapter1 = Chapter.create(name) as Chapter;
    const chapter2 = Chapter.create(name) as Chapter;
    const isEqual = chapter1.equals(chapter2);
    expect(isEqual).toEqual(true);
  });

  it('should be able to add a lecture for a chapter', () => {
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    const chapter = Chapter.create('Chapter 1') as Chapter;
    chapter.addLecture(lecture);
    expect(chapter.numberOfLectures).toEqual(1);
  });

  it('should not be able to add a lecture with duplicate name in a chapter', () => {
    const chapter = Chapter.create('Chapter');
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    chapter.addLecture(lecture);
    chapter.addLecture(lecture);
    expect(chapter.numberOfLectures).toEqual(1);
  });

  it('should be able return true if exist lecture in chapter', () => {
    const chapter = Chapter.create('Chapter');
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    chapter.addLecture(lecture);
    const isExist = chapter.includes(lecture);
    expect(isExist).toEqual(true);
  });

  it('should be able to add many lectures for a chapter', () => {
    const nameChapter = 'Chapter 1';
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
    const chapter = Chapter.create(nameChapter) as Chapter;
    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);

    expect(chapter.numberOfLectures).toEqual(2);
  });

  it('should not be able to move negative lecture position ', () => {
    const chapter = Chapter.create('Chapter');
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

    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);
    chapter.addLecture(lecture3);

    chapter.move(lecture1, 0);
    expect(chapter.position(lecture1)).toBe(1);
  });
  it('should not be able to move a position higher than lectures', () => {
    const chapter = Chapter.create('Chapter');
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

    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);
    chapter.addLecture(lecture3);

    chapter.move(lecture2, 10);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(2);
    expect(chapter.position(lecture3)).toBe(3);
  });
  it('should be able to move a lecture position', () => {
    const chapter = Chapter.create('Chapter');
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

    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);
    chapter.addLecture(lecture3);

    chapter.move(lecture2, 3);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(3);
    expect(chapter.position(lecture3)).toBe(2);
  });
  it('should not be able to move a lecture position if not exist', () => {
    const chapter = Chapter.create('Chapter');
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

    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);

    chapter.move(lecture3, 1);
    expect(chapter.position(lecture1)).toBe(1);
    expect(chapter.position(lecture2)).toBe(2);
  });
});

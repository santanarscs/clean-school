import { Chapter, Lecture, Subject } from '@/domain/entities';

describe('Chapter domain Entity', () => {
  it('should be able to create chapter with valid name', () => {
    const name = 'Chapter 1';
    const chapter = Chapter.create({ name }) as Chapter;
    expect(chapter.props.name).toEqual(name);
  });

  it('should be able to add a lecture for a chapter', () => {
    const nameChapter = 'Chapter 1';
    const subject = Subject.create({ name: 'Subject 1' });
    const lecture = Lecture.create({
      name: 'Lecture',
      isOnline: true,
      subject,
    }) as Lecture;
    const chapter = Chapter.create({ name: nameChapter }) as Chapter;
    chapter.addLecture(lecture);
    expect(chapter.props.lectures).toHaveLength(1);
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
    const chapter = Chapter.create({ name: nameChapter }) as Chapter;
    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);

    expect(chapter.props.lectures).toHaveLength(2);
  });
  it('should be able to remove a lecture for a chapter', () => {
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
    const chapter = Chapter.create({ name: nameChapter }) as Chapter;
    chapter.addLecture(lecture1);
    chapter.addLecture(lecture2);
    chapter.removeLecture(lecture1);
    expect(chapter.props.lectures).toHaveLength(1);
  });
});

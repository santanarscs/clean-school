import { Course, Chapter } from '@/domain/entities';

describe('Course domain Entity', () => {
  it('should be not create course with min invalid length name', () => {
    const invalidName = 'C   ';
    const description = 'Description course';
    const error = Course.create({ name: invalidName, description })
      .value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create course with max invalid length name', () => {
    const invalidName = 'C'.repeat(257);
    const description = 'Description course';
    const error = Course.create({ name: invalidName, description })
      .value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be create course with valid name', () => {
    const name = 'First course';
    const description = 'Description course';
    const course = Course.create({ name, description }).value as Course;
    expect(course.name.value).toEqual(name);
    expect(course.description).toEqual(description);
  });

  it('should be able to add a chapter in course', () => {
    const course = Course.create({
      name: 'Course1',
      description: 'Description Course1',
    }).value as Course;
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;

    course.add(chapter);
    expect(course.numberOfChapters).toBe(1);
  });

  it('should not be able to add a chapter in course with duplicate name', () => {
    const course = Course.create({
      name: 'Course1',
      description: 'Description Course1',
    }).value as Course;
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;

    course.add(chapter);
    course.add(chapter);
    expect(course.numberOfChapters).toBe(1);
  });

  it('should be able return true if exist chapter in course', () => {
    const course = Course.create({
      name: 'Course1',
      description: 'Description Course1',
    }).value as Course;
    const chapter = Chapter.create({ name: 'Chapter' }).value as Chapter;
    course.add(chapter);
    expect(course.includes(chapter)).toBeTruthy();
  });

  it('should be able to move chapter position', () => {
    const course = Course.create({
      name: 'Course 1',
      description: 'Description',
    }).value as Course;
    const chapter1 = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    const chapter2 = Chapter.create({ name: 'Chapter 2' }).value as Chapter;
    const chapter3 = Chapter.create({ name: 'Chapter 3' }).value as Chapter;
    course.add(chapter1);
    course.add(chapter2);
    course.add(chapter3);

    course.move(chapter2, 3);
    expect(course.position(chapter1)).toBe(1);
    expect(course.position(chapter2)).toBe(3);
    expect(course.position(chapter3)).toBe(2);
  });

  it('should not be able to move negative chapter position ', () => {
    const course = Course.create({
      name: 'Course 1',
      description: 'Description',
    }).value as Course;
    const chapter1 = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    const chapter2 = Chapter.create({ name: 'Chapter 2' }).value as Chapter;
    const chapter3 = Chapter.create({ name: 'Chapter 3' }).value as Chapter;

    course.add(chapter1);
    course.add(chapter2);
    course.add(chapter3);

    course.move(chapter2, 0);
    expect(course.position(chapter1)).toBe(1);
  });

  it('should not be able to move chapter position if not found ', () => {
    const course = Course.create({
      name: 'Course 1',
      description: 'Description',
    }).value as Course;
    const chapter1 = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    const chapter2 = Chapter.create({ name: 'Chapter 2' }).value as Chapter;
    const chapter3 = Chapter.create({ name: 'Chapter 3' }).value as Chapter;

    course.add(chapter1);
    course.add(chapter2);

    course.move(chapter3, 1);
    expect(course.position(chapter1)).toBe(1);
  });

  it('should be able to remove chapter', () => {
    const course = Course.create({
      name: 'Course 1',
      description: 'Description',
    }).value as Course;
    const chapter1 = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    const chapter2 = Chapter.create({ name: 'Chapter 2' }).value as Chapter;
    const chapter3 = Chapter.create({ name: 'Chapter 3' }).value as Chapter;
    course.add(chapter1);
    course.add(chapter2);
    course.add(chapter3);

    course.remove(chapter2);
    expect(course.numberOfChapters).toEqual(2);
  });

  it('should not be able to remove chapter', () => {
    const course = Course.create({
      name: 'Course 1',
      description: 'Description',
    }).value as Course;
    const chapter1 = Chapter.create({ name: 'Chapter 1' }).value as Chapter;
    const chapter2 = Chapter.create({ name: 'Chapter 2' }).value as Chapter;
    const chapter3 = Chapter.create({ name: 'Chapter 3' }).value as Chapter;
    course.add(chapter1);
    course.add(chapter2);

    course.remove(chapter3);
    expect(course.numberOfChapters).toEqual(2);
  });
});

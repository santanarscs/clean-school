import { Course } from '@/domain/entities';

describe('Course domain Entity', () => {
  it('should be not create course with min invalid length name', () => {
    const invalidName = 'C   ';
    const error = Course.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create course with max invalid length name', () => {
    const invalidName = 'C'.repeat(257);
    const error = Course.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be create course with valid name', () => {
    const name = 'First course';
    const course = Course.create({ name }).value as Course;
    expect(course.name.value).toEqual(name);
  });
});

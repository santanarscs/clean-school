import { Student } from '@/domain/entities';

describe('Student domain Entity', () => {
  it('should be create student with valid name', () => {
    const name = 'Student 1';
    const student = Student.create({ name }).value as Student;
    expect(student.name.value).toEqual(name);
  });
  it('should be not create student with min invalid length name', () => {
    const invalidName = 'S   ';

    const error = Student.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create student with max invalid length name', () => {
    const invalidName = 'S'.repeat(257);

    const error = Student.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });
});

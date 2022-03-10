import { Subject } from '@/domain/entities';

describe('Subject domain Entity', () => {
  it('should be not create course with min invalid length name', () => {
    const invalidName = 'C   ';
    const error = Subject.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create course with max invalid length name', () => {
    const invalidName = 'C'.repeat(257);
    const error = Subject.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });
  it('should be create subject with valid name', () => {
    const name = 'Subject 1';
    const subject = Subject.create({ name }).value as Subject;
    expect(subject.name.value).toEqual(name);
  });
});

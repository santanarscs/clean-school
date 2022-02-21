import { Subject } from '@/domain/entities';

describe('Subject domain Entity', () => {
  it('should be create subject with valid name', () => {
    const name = 'Subject 1';
    const subject = Subject.create({ name }) as Subject;
    expect(subject.props.name).toEqual(name);
  });
});

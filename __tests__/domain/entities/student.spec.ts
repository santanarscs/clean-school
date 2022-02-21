import { Student } from '@/domain/entities';

describe('Student domain Entity', () => {
  it('should be create student with valid name', () => {
    const name = 'Student 1';
    const student = Student.create({ name }) as Student;
    expect(student.props.name).toEqual(name);
  });
});

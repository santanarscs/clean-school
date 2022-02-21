import { Group, Student } from '@/domain/entities';

describe('Group domain Entity', () => {
  it('should be able to create group with valid name', () => {
    const name = 'Group 001';
    const group = Group.create({ name }) as Group;
    expect(group.props.name).toEqual(name);
  });

  it('should be able to add a student in a group', () => {
    const nameStudent = 'Student';
    const nameGroup = 'Group 1';
    const student = Student.create({ name: nameStudent }) as Student;
    const group = Group.create({ name: nameGroup }) as Group;
    group.addStudent(student);
    expect(group.props.students).toHaveLength(1);
  });
  it('should be able to add many students in a group', () => {
    const nameGroup = 'Group 1';
    const student1 = Student.create({ name: 'Student 1' }) as Student;
    const student2 = Student.create({ name: 'Student 2' }) as Student;
    const group = Group.create({ name: nameGroup }) as Group;
    group.addStudent(student1);
    group.addStudent(student2);
    expect(group.props.students).toHaveLength(2);
  });

  it('should be able to remove a student for a group', () => {
    const nameGroup = 'Group 1';
    const student1 = Student.create({ name: 'Student 1' }) as Student;
    const student2 = Student.create({ name: 'Student 2' }) as Student;
    const group = Group.create({ name: nameGroup }) as Group;
    group.addStudent(student1);
    group.addStudent(student2);
    group.removeStudent(student1);
    expect(group.props.students).toHaveLength(1);
  });
});

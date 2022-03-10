import { Group, Student } from '@/domain/entities';

describe('Group domain Entity', () => {
  it('should be not create group with min invalid length name', () => {
    const invalidName = 'G   ';
    const error = Group.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be not create group with max invalid length name', () => {
    const invalidName = 'G'.repeat(257);
    const error = Group.create({ name: invalidName }).value as Error;
    expect(error.name).toEqual('InvalidNameError');
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it('should be able to create group with valid name', () => {
    const name = 'Group 001';
    const group = Group.create({ name }).value as Group;
    expect(group.name.value).toEqual(name);
  });

  it('should be able to add a student in a group', () => {
    const nameStudent = 'Student';
    const nameGroup = 'Group 1';
    const student = Student.create({ name: nameStudent }).value as Student;
    const group = Group.create({ name: nameGroup }).value as Group;
    group.add(student);
    expect(group.numberOfStudents).toEqual(1);
  });
  it('should be able to add many students in a group', () => {
    const nameGroup = 'Group 1';
    const student1 = Student.create({ name: 'Student 1' }).value as Student;
    const student2 = Student.create({ name: 'Student 2' }).value as Student;
    const group = Group.create({ name: nameGroup }).value as Group;
    group.add(student1);
    group.add(student2);
    expect(group.numberOfStudents).toEqual(2);
  });

  it('should be able to remove a student for a group', () => {
    const nameGroup = 'Group 1';
    const student1 = Student.create({ name: 'Student 1' }).value as Student;
    const student2 = Student.create({ name: 'Student 2' }).value as Student;
    const group = Group.create({ name: nameGroup }).value as Group;
    group.add(student1);
    group.add(student2);
    group.remove(student1);
    expect(group.numberOfStudents).toEqual(1);
  });

  it('should be able return true if exist student in group', () => {
    const group = Group.create({ name: 'Group' }).value as Group;
    const student = Student.create({ name: 'Student 1' }).value as Student;
    group.add(student);
    expect(group.includes(student)).toBeTruthy();
  });

  it('should be return true if equals group', () => {
    const name = 'Group';
    const group1 = Group.create({ name }).value as Group;
    const group2 = Group.create({ name }).value as Group;
    expect(group1.equals(group2)).toBeTruthy();
  });
});

import { SubjectData } from './subject-data';

export interface SubjectsRepository {
  add(subject: SubjectData): Promise<void>;
  findByName(name: string): Promise<SubjectData>;
  findAll(): Promise<SubjectData[]>;
  exists(subject: SubjectData): Promise<boolean>;
}

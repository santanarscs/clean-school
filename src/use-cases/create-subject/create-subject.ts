import { Either, left, right } from '@/core/domain/entities';
import { Subject } from '@/domain/entities';
import { ExistingSubjectError } from './erros';
import { UseCase, SubjectsRepository, SubjectData } from '../ports';

export class CreateSubject implements UseCase {
  constructor(private repository: SubjectsRepository) {}

  async execute(
    request: SubjectData,
  ): Promise<Either<ExistingSubjectError, Subject>> {
    const { name } = request;
    const isExistSubject = await this.repository.findByName(name);
    if (!isExistSubject) {
      return left(new ExistingSubjectError());
    }
    const subject = Subject.create({ name }).value as Subject;
    await this.repository.add({ name });
    return right(subject);
  }
}

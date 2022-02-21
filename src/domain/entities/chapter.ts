import { Entity } from '@/core/domain/entities';
import { Lecture } from '.';

type ChapterProps = {
  name: string;
  lectures?: Lecture[];
};
export class Chapter extends Entity<ChapterProps> {
  private constructor(props: ChapterProps, id?: string) {
    super(props, id);
  }

  static create({ name }: ChapterProps, id?: string): Chapter {
    const chapter = new Chapter({ name }, id);
    return chapter;
  }

  public addLecture(chapter: Lecture) {
    if (this.props.lectures) {
      this.props.lectures.push(chapter);
    } else {
      this.props.lectures = [chapter];
    }
  }

  public removeLecture(chapter: Lecture) {
    if (this.props.lectures)
      this.props.lectures = this.props.lectures.filter(
        item => item !== chapter,
      );
  }
}

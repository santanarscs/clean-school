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

  equals(other: Chapter) {
    return this.props.name === other.props.name;
  }

  public addLecture(chapter: Lecture) {
    if (this.props.lectures) {
      this.props.lectures.push(chapter);
    } else {
      this.props.lectures = [chapter];
    }
  }

  public removeLecture(lecture: Lecture) {
    if (this.props.lectures)
      this.props.lectures = this.props.lectures.filter(
        item => item !== lecture,
      );
  }

  move(lecture: Lecture, to: number): void {
    if ((this.props.lectures && to > this.props.lectures?.length) || to <= 0) {
      return;
    }
    const from = this.position(lecture) - 1;
    const element = this.props.lectures?.splice(from, 1)[0] as Lecture;
    this.props.lectures?.splice(to - 1, 0, element);
  }

  position(lecture: Lecture): number {
    const lectureInChapter = this.props.lectures?.find(lec =>
      lec.equals(lecture),
    );
    if (!lectureInChapter) {
      return;
    }
    return this.props.lectures?.indexOf(lectureInChapter) + 1;
  }
}

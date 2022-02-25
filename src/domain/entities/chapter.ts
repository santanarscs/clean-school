import { Lecture } from '.';

export class Chapter {
  private readonly lectures: Lecture[] = [];

  private constructor(private readonly name: string) {}

  static create(name: string): Chapter {
    const chapter = new Chapter(name);
    return chapter;
  }

  get numberOfLectures(): number {
    return this.lectures.length;
  }

  equals(other: Chapter) {
    return this.name === other.name;
  }

  public addLecture(lecture: Lecture) {
    if (!this.includesLectureWithSameName(lecture)) {
      this.lectures.push(lecture);
    }
  }

  private includesLectureWithSameName(lecture: Lecture): boolean {
    return !!this.lectures.find(lec => lec.props.name === lecture.props.name);
  }

  includes(lecture: Lecture): boolean {
    return !!this.lectures.find(lec => lec.equals(lecture));
  }

  move(lecture: Lecture, to: number): void {
    if (to > this.lectures.length || to <= 0) {
      return;
    }
    const position = this.position(lecture);
    if (position) {
      const from = position - 1;
      const element = this.lectures.splice(from, 1)[0];
      this.lectures.splice(to - 1, 0, element);
    }
  }

  remove(lecture: Lecture) {
    const position = this.position(lecture);
    if (position) this.lectures.splice(position, 1);
  }

  position(lecture: Lecture): number | undefined {
    const lectureInChapter = this.lectures.find(lec => lec.equals(lecture));
    if (!lectureInChapter) {
      return undefined;
    }
    return this.lectures.indexOf(lectureInChapter) + 1;
  }
}

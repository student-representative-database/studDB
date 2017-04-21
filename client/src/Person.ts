export interface PersonType {
  name: string,
  age: number
}

export class Person {
  private name: string
  private age: number

  constructor(person: PersonType) {
    this.name = person.name
    this.age = person.age
  }

  public getName(): string {
    return this.name
  }

  public getAge(): number {
    return this.age
  }
}

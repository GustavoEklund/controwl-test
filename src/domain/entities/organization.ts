export class Organization {
  private _id: string
  private _name: string
  private _description: string

  public constructor({ id, name, description }: { id: string, name: string, description: string}) {
    this._id = id
    this._name = name
    if (!this.isNameValid()) throw new Error('invalid name')
    this._description = description
    if (!this.isDescriptionValid()) throw new Error('invalid description')
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get description(): string {
    return this._description
  }

  private isNameValid(): boolean {
    return this.name.length > 3
  }

  private isDescriptionValid(): boolean {
    return this.description !== ''
  }

  public updateName(name: string): void {
    this._name = name
    if (!this.isNameValid()) throw new Error('invalid name')
  }

  public updateDescription(description: string): void {
    this._description = description
    if (!this.isDescriptionValid()) throw new Error('invalid description')
  }
}

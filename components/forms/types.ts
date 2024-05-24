export type Input = {
    inputType:string,
    options:Array<string>,
    label:string,
    name:string,
    row:string
}

export type Step = {
    title:string,
    inputs : Array<Input>
}

export interface Props {
    steps:Step[]
  }
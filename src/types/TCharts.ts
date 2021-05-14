export interface IYTick {
  payload: {
    coordinate: number
    value: any
    offset: number
    tickCoord: number
    isSHow: boolean
  }
  x: number
  y: number
  width: number
  height: string
  fill: string
  stroke: string
  textAnchor: string
  verticalAnchor: string
  visibleTicksCount: number
  dominantBaseline?: string
}

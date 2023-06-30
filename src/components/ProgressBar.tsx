import { FC } from "react"

type ProgressBarProps = {
  progress: number
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { progress } = props

  const bar = {
    width: `${progress}%`,
  }

  return (
    <div className={"container-progressbar"}>
      <div style={bar} className="progressbar" />
      <span className={"label"}>{`${progress}%`}</span>
    </div>
  )
}

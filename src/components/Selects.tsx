import React, { FC } from "react"

type SelectsProps = {
  id: string
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  values: {
    name: string
    id: number
  }[]
}

export const Selects: FC<SelectsProps> = (props) => {
  const { value, onChange, values, id, name } = props

  return (
    <select id={id} name={name} value={value} onChange={onChange}>
      <option hidden value={name}>
        {name}
      </option>
      {values.length &&
        values.map((title, ind) => {
          const { name } = title
          return (
            <option key={ind} value={name}>
              {name}
            </option>
          )
        })}
    </select>
  )
}

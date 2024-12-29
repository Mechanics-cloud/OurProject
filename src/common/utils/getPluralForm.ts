type Props = {
  key: {
    few: string
    many: string
    one: string
  }
  value: number
}

export const getPluralForm = ({ key, value }: Props): string => {
  let str = ''

  switch (true) {
    // 5-20
    case value >= 5 && value <= 20:
      str = key.many
      break

    // end 1
    case value % 10 === 1:
      str = key.one
      break
    // end 2, 3, 4
    case value % 10 >= 2 && value % 10 <= 4:
      str = key.few
      break

    default:
      str = key.many
      break
  }

  return str.replace('{{value}}', String(value))
}

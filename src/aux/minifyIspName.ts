export function minifyIspName(isp: string) {
  if (isp.split(' ').filter(word => word.split('').length === 1)) {
    const uniqueLetters = isp.split(' ').filter(word => word.split('').length === 1)
    const intersactionWord = uniqueLetters.join('')

    const [main, secondary] = isp.split(' ').filter(word => word.split('').length !== 1)

    return `${intersactionWord} ${main} ${secondary}`
  }

  const [main, secondary] = isp.split(' ')

  return `${main} ${secondary}`
}

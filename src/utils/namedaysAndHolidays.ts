function padout(n: number): string {
  if (n < 10) {
    return "0" + n
  } else {
    return n + ""
  }
}

/**
 *
 * @param year Year
 * @returns the date Easter is the given year in format "YYYY-MM-DD" ?
 */
export function easter(year: number) {
  let c = Math.floor(year / 100)
  let n = year - 19 * Math.floor(year / 19)
  let k = Math.floor((c - 17) / 25)
  let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15
  let o = i - 30 * Math.floor(i / 30)
  let p =
    o -
    Math.floor(o / 28) *
      (1 -
        Math.floor(o / 28) *
          Math.floor(29 / (o + 1)) *
          Math.floor((21 - n) / 11))
  let j = year + Math.floor(year / 4) + p + 2 - c + Math.floor(c / 4)
  let q = j - 7 * Math.floor(j / 7)
  let l = p - q
  let m = 3 + Math.floor((l + 40) / 44)
  let d = l + 28 - 31 * Math.floor(m / 4)

  return year + "-" + padout(m) + "-" + padout(d)
}

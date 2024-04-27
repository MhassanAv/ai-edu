import { Poppins,Open_Sans } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight:'500',
  variable: '--font-poppins',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  weight:['500','700','600','400'],
  variable: '--font-open-sans',
})

export const fonts = {
  poppins,openSans
}
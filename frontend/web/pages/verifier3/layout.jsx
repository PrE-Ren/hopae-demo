import { Chivo } from 'next/font/google'
// import './styles.css'

const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chivo',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={chivo.variable}>
        {children}
      </body>
    </html>
  )
}
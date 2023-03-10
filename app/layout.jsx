import Header from "../components/Header"
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <div className="py-8 px-6 md:px-24 bg-indigo-100 min-h-[calc(100vh-96px)]">
          {children}
        </div>
      </body>
    </html>
  )
}

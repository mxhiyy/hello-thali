import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'


const Homelayout = ({ children }) => {
  return (
      <main>
      <Navbar />
        { children }
      <Footer />
      </main>
  )
}

export default Homelayout
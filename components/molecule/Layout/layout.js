import Navbar from '../Navbar2/Navbarhome.js';
import Footer from '../Footer/footer.js';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
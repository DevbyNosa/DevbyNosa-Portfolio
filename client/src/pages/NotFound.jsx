import Navbar from "../components/Header"
import Footer from '../components/Footer'
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import SEO from "../components/SEO"
 export default function NotFound() {
 return (
 
   <>
    <SEO title="Page Not Found - DevbyNosa" description="The page you requested could not be found." />
    <Navbar />
      
      <main className="h-30 ">
        <div className="flex flex-col items-center justify-center  gap-4 mt-[100px]">
          <h1 className="text-4xl font-bold">404 - Not Found</h1>
          <p className="text-[16px]">This page could not be found</p>

          <Link to="/" className="bg-black text-white p-2 flex gap-2 items-center text-[13px]"><ArrowLeft size={14} /> Back to Home</Link>
        </div>
      </main>
    <Footer />
   </>
 )
 }
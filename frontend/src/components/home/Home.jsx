import React from 'react'
import './Home.css'
import Hero from '../hero/Hero'
import Section1 from '../section1/Section1'
import Section2 from '../section2/Section2'
import Section3 from '../section3/Section3'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Footer></Footer>
    </>
  )
}

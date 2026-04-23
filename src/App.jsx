import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import NavbarBanner from './components/Navbar/NavbarBanner';
import Hero from './components/Hero/Hero';
import NumberCounter from './components/NumberCounter/NumberCounter';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Img1 from "./assets/banner1.png"
import Img2 from "./assets/banner2.png"
import Banner from './components/Banner/Banner';
import SubjectCard from './components/SubjectCard/SubjectCard';
import Testimonial from './components/Testimonial/Testimonial';
import Footer from './components/Footer/Footer';
import Courses from './pages/Courses';
import CreateCourse from './pages/CreateCourse';

const BannerData1 = {
  image: Img1 ,
  tag:"CUSTOMIZE WITH YOUR SCHEDULE",
  title:"Personalized Professional Online Tutor on Your Schedule",
  subtitle:"Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form",
  link:"#",
}
const BannerData2 = {
  image:Img2,
  tag:"CUSTOMIZE WITH YOUR SCHEDULE",
  title:"Talented and Qualified Tutors to Serve You for Help",
  subtitle : "Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility. Lorem ipsum is a placeholder text commonly used",
  link:"#",
}

const Home = () => (
  <main className=" overflow-x-hidden">
    <NavbarBanner />
    <Hero />
    <NumberCounter />
    <WhyChooseUs />
    <Banner {...BannerData1}/>
    <Banner {...BannerData2} reverse= {0} />
    <SubjectCard />
    <Testimonial/>
    <Footer/>
  </main>
);



const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/create-course" element={<CreateCourse />} />
    </Routes>
  </BrowserRouter>
);
 
export default App;
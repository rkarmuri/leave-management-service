import React from 'react';
import Navbar from '../home/Navbar';
import '../App.css';
import img from '../assets/img.png';
//import TestConnection from '../services/TestConnection';

const Home = () => {
  return (
    <div className='page'>
      <Navbar />
      <header className='header'>
        <img src={img} alt="Logo" />
      </header>
      <section className='content'>
        <p>
          The Leave Management System is a comprehensive solution crafted to simplify and optimize the process of handling employee leave requests within an organization. 
          This system is tailored to meet the needs of modern workplaces by providing a seamless platform where employees can effortlessly apply for leave, 
          keep track of their leave balance, and access a detailed history of their previous leave requests. By centralizing all leave-related activities in one place, 
          the system ensures that employees remain informed and empowered throughout the entire process.
        </p>
        <br />
        <p>
          For administrators, the Leave Management System offers a robust set of tools to effectively manage and oversee leave operations across the organization. 
          Administrators have the ability to view, approve, or decline leave requests in real time, allowing them to make informed decisions quickly. 
          Additionally, they can set and adjust leave policies, ensuring that the system aligns with the company’s evolving needs. 
          The intuitive user interface is designed to be user-friendly, reducing the learning curve and enabling administrators to manage leave with minimal effort.
        </p>
        <br />
        <p>
          The Leave Management System is not just a tool, but a strategic asset that enhances productivity, ensures compliance with organizational policies, 
          and fosters a more organized and transparent workplace culture.
        </p>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import Navbar from '../home/Navbar';
import './Login.css';

const About = () => {
  return (
    <div className='page'>
      <Navbar />
      <section style={styles.content}>
        <h2>About Us</h2>
        <p>
      Welcome to the Leave Management System, a cutting-edge platform designed to revolutionize the way organizations handle employee leave requests. 
      Our system is built with efficiency, transparency, and ease of use in mind, offering a seamless experience for both employees and administrators.
    </p><br />
    <p>
      Our mission is to simplify the leave management process, ensuring that employees can effortlessly apply for their well-deserved time off, 
      while administrators can manage these requests with unparalleled ease. We understand that managing leave can be a complex and time-consuming task, 
      which is why our system is equipped with features that automate and streamline every step of the process.
    </p><br />
    <p>
      For employees, our platform provides a user-friendly interface where they can submit leave requests in just a few clicks, 
      view the status of their applications, and access their leave history anytime, anywhere. This level of transparency and accessibility empowers employees, 
      allowing them to manage their work-life balance more effectively.
    </p><br />
    <p>
      On the administrative side, the Leave Management System offers a robust set of tools to monitor, approve, or decline leave requests based on organizational policies. 
      With detailed reporting and analytics, administrators can gain insights into leave patterns and make data-driven decisions to optimize workforce management. 
      Our system also includes customizable leave policies, ensuring that it can adapt to the unique needs of any organization.
    </p><br />
    <p>
      We believe that a well-managed leave system contributes to a more productive and satisfied workforce. 
      By using our Leave Management System, organizations can reduce administrative overhead, ensure compliance with leave policies, 
      and foster a positive work environment where both employees and employers thrive.
    </p>
      </section>
    </div>
  );
};

const styles = {
  content: {
    padding: '5rem',
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight:'600',
  },
};

export default About;

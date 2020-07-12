import React from 'react';
import Contacts from '../contact/Contact';
import ContactForm from '../contact/ContactForm';

export const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};
export default Home;

"use client";
import emailjs from "@emailjs/browser";
const service_id = "service_g6rfoep";
const template_id = "template_w4hew97";
const public_key = "EMIF3YlU8e650fRFk";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const getTemplate=(to_name:string,message:string,to_email:string,subject:string)=>{
  return {
    to_name,
    message,
    to_email,
    subject
  };
}

export const sendEmail = async (user_email:string,user_name:string,consultant_email:string,consultant_name:string,startsAt:string,description:string) => {
  const formattedDate = formatDate(startsAt); 
  const subject1="Consultation Booked Successfully 🎉"
  const subject2="New Consultation Booked with You!"
  const message1=`Your consultation with consultant- ${consultant_name} <${consultant_email}> has been successfully placed on ${formattedDate}.`
  const message2=`A talent- ${user_name} <${user_email}> has booked a new consultation with you on ${formattedDate}.`
  const templateParams1=getTemplate(user_name,message1,user_email,subject1)
  const templateParams2=getTemplate(consultant_name,message2,consultant_email,subject2)
  try {
    emailjs
      .send(service_id, template_id, templateParams1, public_key)
      .then((response) => {1
        console.log("email sent to user!");
      });
      emailjs
      .send(service_id, template_id, templateParams2, public_key)
      .then((response) => {1
        console.log("email sent to consultant!");
      });
  } catch (err) {
    console.log(err);
  }
};

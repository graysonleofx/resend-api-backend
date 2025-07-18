// Import the Resend SDK
import {Resend} from 'resend';
const resend = new Resend('process.env.RESEND_API_KEY');

// const resend = new Resend('re_DNNcQTSM_6zMTfZDnVD8Ls8Tn3t9fXXY1');

export async function POST(req) {
  // const body = await req.json();

  const {name, email, phone, subject, message} = await req.json;

  try{
    const data = await resend.emails.send({
      from: email,
      to: ['contact@pennywiselogistics.online'],
      subject: subject || 'New Contact Message',
      html: `
        <p><strong>Name:</strong>${name} </p>
        <br>
        <p><strong>Email:</strong>${email} </p>
        <br>
        <p><strong>Phone:</strong>${phone} </p>
        <br>
        <p><strong>Message:</strong>${message} </p>
        <br>
      `
    })
    console.log('Resend Response', data);

    return Response.json({success: true, data});
  }catch(error){
    console.error('Contact email error', error)
    return Response.json({success: false, error: error.message})
  }
}


// export async function POST(req) {
//   const body = await req.json();

//   const {name, email, phone, subject, message} = body;

//   try{
//     const data = await resend.emails.send({
//       from: email,
//       to: ['contact@pennywiselogistics.online'],
//       subject: subject,
//       html: `
//         <p><strong>Name:</strong>${name} </p>
//         <br>
//         <p><strong>Email:</strong>${email} </p>
//         <br>
//         <p><strong>Phone:</strong>${phone} </p>
//         <br>
//         <p><strong>Message:</strong>${message} </p>
//         <br>
//       `
//     })
//     console.log('Resend Response', data);

//     return Response.json({ success: true, data, message: 'Email sent successfully' });
//   }catch(error){
//     return Response.json({success: false, error: error.message}, {status: 500})
//   }
// }

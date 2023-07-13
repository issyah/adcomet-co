/*** api to retrieve personal information of the user**/ 


export default async function handler(req,res) {

  const payload = {
    status: true,
    firstName: 'John',
    lastName: 'Doe',
    company: 'Adcommet',
    email: 'john@adcommet.com',
  }

  return res.status(200).json({...payload});
}
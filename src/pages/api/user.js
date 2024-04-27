export default function handler(req, res) {
    res.status(200).json({ name:'john' , email:'john@example.com',role:"admin",token:'32312321' })
  }
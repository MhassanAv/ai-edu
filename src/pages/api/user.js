export default function handler(req, res) {
  res
    .status(200)
    .json({
      name: "john",
      email: "john@example.com",
      role: "student",
      token: "32312321",
    });
}

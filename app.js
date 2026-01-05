import express from "express";
import bcrypt from "bcrypt";
import e from "express";

const app = express();
const users = [];

app.use(express.json());

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find User
    const user = users.find((u) => u.email === email);
    if (user) {
      return res.status(400).send({ message: "wrong email or password" });
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Store User
    users.push({ email, password: hashedPassword });
    res.status(201).send({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find User
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).send({ message: "wrong email or password" });
    }
    //Compare Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "wrong email or password" });
    }
    res.status(200).send({ message: "User Logged In Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Sample route to demonstrate bcrypt usage
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

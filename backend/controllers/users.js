const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, "output.jpg"); // Rename file with current timestamp
  }
});
const upload = multer({ storage: storage });

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    content: 1,
    dateCreated: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/generate-pdf", upload.single('image'), (req, res) => {
  // Accessing properties of req.body within req.body
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const cls = req.body.cls;
  const desc = req.body.desc;
  const diag = req.body.diag;
  
  // Generate PDF
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.fontSize(26).text(`Skin Cancer Test Report`, {align: "center"});
  doc.text("\n");
  doc.fontSize(16).text(`Date: ${new Date().toLocaleDateString()}`);
  doc.image('./uploads/output.jpg', {
    fit: [180, 180],
    align: 'center',
    valign: 'center'
  });
  doc.text("\n");doc.text("\n");doc.text("\n");doc.text("\n");
  doc.text("\n");doc.text("\n");doc.text("\n");doc.text("\n");
  doc.text("\n");doc.text("\n");
  doc.fontSize(16).text(`Name: ${name}`);
  doc.fontSize(16).text(`Age: ${age}`);
  doc.fontSize(16).text(`Gender: ${gender}`);
  doc.fontSize(16).text(`Classification: ${cls}`);
  doc.text("\n");
  doc.fontSize(16).text(`Description: ${desc}`);
  doc.text("\n");
  doc.fontSize(16).text(`Diagnosis: ${diag}`);

  doc.end();

  // Provide download link to the generated PDF
  res.download('output.pdf', 'output.pdf', (err) => {
      if (err) {
          console.error('Error while downloading PDF:', err);
          res.status(500).send('Error while downloading PDF');
      } else {
          console.log('PDF downloaded successfully');
          // Optionally, you can delete the generated PDF file after download
          fs.unlinkSync('output.pdf');
      }
  });
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const checkUsername = (obj) => obj.username === username;

  if (!username) {
    return response.status(400).json({
      error: "username is required",
    });
  }
  if (!password) {
    return response.status(400).json({
      error: "password is required",
    });
  }
  const condt = await User.find({});
  if (condt.some(checkUsername)) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;

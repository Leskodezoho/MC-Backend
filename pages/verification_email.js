function verification_content(activationlink) {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f2;
      margin: 0;
      font-family: 'Arial', sans-serif;
    }

    .content {
      width: 80%;
      text-align: center;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h4 {
      color: #b03c3c;
      margin: 0 0 10px;
    }

    h3 {
      color: #333;
      margin: 10px 0;
    }

    p {
      color: #555;
      margin: 5px 0;
    }

    a {
      color: #2196F3;
      text-decoration: none;
      font-weight: bold;
    }

    .signature {
      font-weight: bold;
      color: #b03c3c;
    }
  </style>
</head>
<body>
  <div class="content">
    <h4>Hi there,</h4>
    <h3>Welcome to the app!</h3>
    <p>Thanks for signing up. Click the below link to activate your account:</p>
    <p><a href="${activationlink}" target="_blank">Click here to activate</a></p>
   <br>
    <p>Regards,</p>
    <p class="signature">The Team</p>
  </div>
</body>
</html>
`;
  return content;
}
module.exports = { verification_content };

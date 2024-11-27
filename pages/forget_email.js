function forgot_content(email, activationlink) {
  const content = `
<!DOCTYPE html>
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
        padding: 20px;
        font-family: Arial, sans-serif;
      }
  
      .container {
        width: 80%;
        max-width: 600px;
        text-align: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      .header img {
        width: 120px;
        height: auto;
      }
  
      .title {
        color: #b03c3c;
        margin: 10px 0;
      }
  
      p {
        color: #555;
        margin: 5px 0;
      }
  
      .reset_password_anchor {
        display: block;
        margin: 20px 0;
        text-decoration: none;
      }
  
      .reset_password_button {
        display: inline-block;
        padding: 10px 20px;
        color: #fff;
        background-color: #b03c3c;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
  
      .horizontal_line {
        border: 0;
        height: 1px;
        background: #ddd;
        margin: 20px 0;
      }
  
      .contact_support a {
        color: #b03c3c;
        text-decoration: none;
      }
  
      .address {
        font-size: 12px;
        color: #777;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
     
      <div class="content">
        <h2 class="title">Reset your password</h2>
        <p>Click on the button below within the next 60 minutes to reset your password for your account <a href="mailto:${email}" target="_blank">k${email}</p>
        <a class="reset_password_anchor" href="${activationlink}" target="_blank">
          <div class="reset_password_button">Reset your password</div>
        </a>
        <hr class="horizontal_line">
        <div class="contact_support">
          If you are having any issues with your account, check out our <a href="#" target="_blank">support docs</a>.
        </div>
        <p>If this was a mistake, please ignore this email and nothing will happen.</p>
      </div>
      <div class="address">San Francisco</div>
    </div>
  </body>
  </html>
  
</html>
`;
  return content;
}
module.exports = { forgot_content };

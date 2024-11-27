const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
        margin-top: 20px;
        font-family: "Arial", sans-serif;
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

      .signature {
        font-weight: bold;
        color: #b03c3c;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h4>Hello,</h4>
      <h3>Congratulations on joining our community!</h3>
      <p>
        We're thrilled to welcome you to our app. Your registration was
        successful, and you're now part of a vibrant and exciting community.
      </p>
      <p>
        Explore our features, connect with fellow users, and make the most of
        your experience. If you have any questions, our team is here to help.
      </p>
      <p>Best wishes for your journey with us!</p>
      <p>Warm regards,</p>
      <p class="signature">The Team</p>
    </div>
  </body>
</html>
`;
module.exports = content;

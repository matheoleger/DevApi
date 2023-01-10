import transporter from "#config/mailer.js"

export const sendWelcomeEmail = (user, token) =>  {
    if(!user || !token) throw new Error("User or validation token missing")

    const kbdStyle = ` background-color: #eee; 
    border-radius: 3px;border: 1px solid #b4b4b4; 
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset; 
    color: #333;
    display: inline-block;
    font-size: .85em;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;`



    const message = {
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: "Welcome to our todo app",
        html: `<h1 style="font-family: Arial">Welcome to our wonderful todo application</h1><h2>Here your application token <kbd style="${kbdStyle}">${token}</kbd></h2>`
    }
    return transporter.sendMail(message)
}
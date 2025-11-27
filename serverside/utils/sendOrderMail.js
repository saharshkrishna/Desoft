// utils/sendOrderEmail.js
const  transporter  = require("./mailConfig");

require('dotenv').config();

exports.sendOrderEmail = async (orderId, customerInfo, orderItems, totalAmount, delivery) => {
  const itemsHtml = orderItems
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.productName}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">₹${item.price}</td>
        </tr>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@yourapp.com",
    to: process.env.ADMIN_EMAIL || "admin@yourapp.com", // send to admin
    subject: `🛒 New Order Placed – ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        
        <h2 style="color:#333;">New Order Received</h2>
        <p>A new order has been placed. Here are the details:</p>

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${customerInfo.name}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Address:</strong> ${customerInfo.address}</p>

        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Delivery Date:</strong> ${delivery.date}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="margin-top: 20px;">Total Amount</h3>
        <p style="font-size: 18px; font-weight: bold;">₹${totalAmount}</p>

        <hr style="margin: 25px 0;" />

        <p>This is an automated notification email. Please review the order in your admin dashboard.</p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

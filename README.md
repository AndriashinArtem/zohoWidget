# 💱 Currency Rate Widget for Zoho CRM

This widget displays the current USD exchange rate from the National Bank of Ukraine (NBU), compares it to the rate specified in a Zoho CRM record, and allows updating the CRM field if the difference exceeds 5%.

## 🔧 Features

- Fetches official USD rate from the NBU API.
- Retrieves the rate from the current record in Zoho CRM.
- Calculates the percentage difference between the NBU and CRM rate.
- Displays an "Update" button if the difference is greater than ±5%.
- Updates the CRM record with the latest NBU rate upon confirmation.

## 🧩 Technologies Used

- HTML, CSS, JavaScript
- Zoho CRM Embedded App SDK
- National Bank of Ukraine API

## 📸 Interface

- Clean and responsive design with modern gradients.
- Shows NBU rate, deal rate, and percentage difference.
- Smooth transitions and hover animations.

## 🚀 How to Use

1. Set up the Zoho CRM Embedded App SDK.
2. Deploy the files to your web server or Zoho Creator.
3. Embed the widget in your desired Zoho module (e.g., "Deals").
4. Ensure the CRM record contains a numeric field named `Currency_Rate`.

## 🧪 Notes

- The NBU API returns exchange rates in JSON format.
- The CRM field `Currency_Rate` must be numeric.
- The widget currently supports USD only; you can change this by modifying the `valcode` parameter in `NBU_API`.

## 📌 Author

Developed by Artem for syncing Zoho CRM with up-to-date currency data from the National Bank of Ukraine.
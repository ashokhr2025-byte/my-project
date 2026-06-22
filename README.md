# 💼 Premium Payroll & Payslip Calculator

A modern, highly responsive, and premium pro-rata payroll calculator built for **I-Bacus-Tech Solutions**. This application allows HR departments and employees to compute gross and net salaries (pro-rata based on days worked) in real-time, visualize the salary breakdown, and generate professional, print-ready PDF payslips.

---

## ✨ Features

* **Real-time Pro-rata Computation**: Automatically adjusts Basic Pay, HRA, and Travel Allowance based on days worked vs. total working days.
* **Modern Data Visualization**: Dynamically rendering pro-rata salary components in a color-coded bar chart.
* **Professional PDF Generation**: Generates high-quality corporate A4 payslips using `jsPDF` complete with official headers, dynamic text-to-words currency formatting, and signature lines.
* **Responsive Glassmorphism UI**: Beautiful, dark-themed dashboard container utilizing the premium Google Font "Outfit", micro-animations, glowing focus states, and device-responsive grids.
* **Vercel Optimized**: Pre-configured headers and routes for instantaneous deployment.

---

## 📁 Project Structure

```text
/ (Root)
├── index.html          # Semantic HTML5 entrypoint & SEO meta tags
├── vercel.json         # Vercel deployment configuration
├── package.json        # Node script runner & dev server settings
├── README.md           # Project documentation
├── css/
│   └── styles.css      # Custom design tokens, transitions, and layout
└── js/
    ├── utils.js        # DOM select helpers, date parsing, & currency conversions
    ├── calculator.js   # Pure computation logic and visual bar handlers
    ├── pdfGenerator.js # PDF compilation and layout drawing using jsPDF
    └── app.js          # Main event handler bindings & form initialization
```

---

## 🚀 Local Development

To run the application locally with hot-reloading:

1. Clone or pull the repository.
2. Install the developer dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the local address: [http://localhost:5173](http://localhost:5173).

To test the production build:
```bash
npm run build
```

---

## ☁️ Vercel Deployment

This project is ready for one-click deployment to **Vercel**:

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Vercel will auto-detect the configuration (Vite, `index.html` at root).
4. Click **Deploy** and your calculator will be live!

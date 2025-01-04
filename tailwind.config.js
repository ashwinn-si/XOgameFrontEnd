/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      fontFamily:{
        main:["Montserrat-Regular"]
      },
      colors: {
        netural: "#f7f7f7",
        mainBg:"#b9b9b9",
        borderColor: "#1f2937",
        highlighting:"#fef08a",
        success: "#10b981",
        loss:"#FF6347",
        error:"#ef4444",
        warning:"#f97316",
        primarybtn:"#b9b9b9",
        primarybtnHover:"#949494",
        primarybtnActive:"#6B7280"
      },
      width : {
        "300" : "300px",
        "500" : "500px",
      },
      height : {
        "300" : "300px",
        "500" : "500px",
      },
      fontSize:{
        "heading-lg" : "1.6rem",
        "heading" : "1.2rem",
        "subheading-lg": "1rem",
        "subheading" : "0.6rem",
        "text-lg" : "1rem",
        "text":"0.8rem",
        "button-lg" : "1rem",
        "button":"0.8rem",
      }
    },
  },
  plugins: [],
}


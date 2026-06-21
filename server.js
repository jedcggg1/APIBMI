const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/bmi", (req, res) => {
    const { weight, height } = req.query;

    if (!weight || !height || weight === '' || height === '') {
        return res.status(400).json({ error: "Please provide both weight and height." });
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        return res.status(400).json({ error: "Weight and height must be valid positive numbers." });
    }

    const heightInMeters = h / 100;
    
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(2);
    const bmiValue = parseFloat(bmi);
    let category = "";

    if (bmiValue < 18.5) {
        category = "Skinny (Underweight)";
    } else if (bmiValue >= 18.5 && bmiValue <= 22.9) {
        category = "Normal (Healthy Weight)";
    } else if (bmiValue >= 23.0 && bmiValue <= 24.9) {
        category = "Overweight";
    } else if (bmiValue >= 25.0 && bmiValue <= 29.9) {
        category = "Obese Class I";
    } else {
        category = "Obese Class II";
    }

    res.json({
        weight: w,
        height: h,
        bmi: bmiValue,
        category: category
    });
});

app.listen(3000, () => {
    console.log("BMI API Server is running on port 3000");
});
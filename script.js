document.getElementById('calculateBTN').addEventListener('click', async () => {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    
    const bmiValueSpan = document.getElementById('bmiValue');
    const bmiCategorySpan = document.getElementById('bmiCategory');

    bmiValueSpan.innerText = "Calculating...";
    bmiCategorySpan.innerText = "--";
    bmiCategorySpan.className = "";

    try {
        const response = await fetch(`http://localhost:3000/bmi?weight=${weight}&height=${height}`);
        const data = await response.json();

        if (response.ok) {
            bmiValueSpan.innerText = data.bmi;
            bmiCategorySpan.innerText = data.category;
            
            if (data.category.includes("Skinny")) {
                bmiCategorySpan.className = "skinny";
            } else if (data.category.includes("Normal")) {
                bmiCategorySpan.className = "normal";
            } else if (data.category.includes("Overweight")) {
                bmiCategorySpan.className = "overweight";
            } else {
                bmiCategorySpan.className = "obese";
            }

        } else {
            bmiValueSpan.innerText = "Error";
            bmiCategorySpan.innerText = data.error;
            bmiCategorySpan.className = "error";
        }
    } catch (error) {
        bmiValueSpan.innerText = "Error";
        bmiCategorySpan.innerText = "Cannot connect to the server.";
        bmiCategorySpan.className = "error";
    }
});
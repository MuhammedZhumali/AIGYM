document.getElementById("fitnessForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);
  const goal = document.getElementById("goal").value;

  const plan = generatePlan(age, gender, height, weight, goal);
  document.getElementById("output").innerHTML = plan;

  localStorage.setItem("lastPlan", JSON.stringify({ age, gender, height, weight, goal, html: plan }));
});

function generatePlan(age, gender, height, weight, goal) {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier = 1.55;
  const maintenanceCalories = Math.round(bmr * activityMultiplier);

  let goalCalories;
  let advice;

  if (goal === "lose") {
    goalCalories = maintenanceCalories - 500;
    advice = "To lose weight, you need to consume fewer calories than you burn.";
  } else if (goal === "gain") {
    goalCalories = maintenanceCalories + 300;
    advice = "To gain muscle, eat slightly above maintenance with strength training.";
  } else {
    goalCalories = maintenanceCalories;
    advice = "To maintain your weight, aim to eat around your maintenance calories.";
  }

  const bmi = weight / ((height / 100) ** 2);
  let aiTip = "";

  if (bmi < 18.5) {
    aiTip = "⚠️ You may be underweight — aim to eat nutrient-dense, calorie-rich foods.";
  } else if (bmi >= 25) {
    aiTip = "⚠️ Your BMI is high — consider reducing sugars and increasing daily movement.";
  } else {
    aiTip = "✅ You’re in a healthy range. Maintain balance and stay active!";
  }

  
  const days = 14;
  const dailyDeficit = maintenanceCalories - goalCalories;
  const weightChange = dailyDeficit * days / 7700; // 7700  ≈ 1 kg of fat
  const predictedWeight = (weight - weightChange).toFixed(1);


  return `
    <strong>BMR:</strong> ${Math.round(bmr)} kcal/day<br>
    <strong>Maintenance Calories:</strong> ${maintenanceCalories} kcal/day<br>
    <strong>Target Calories:</strong> ${goalCalories} kcal/day<br><br>
    <strong>Advice:</strong> ${advice}<br><br>
    <strong>AI Suggestion:</strong> ${aiTip}<br><br>
    <strong>Predicted Weight in 2 Weeks:</strong> ${predictedWeight} kg<br><br>
    ${generateWorkout(goal)}
  `;
}

function generateWorkout(goal) {
  const plans = {
    lose: [
      "Monday: 30 min cardio + core workout",
      "Tuesday: Upper body strength (light weights)",
      "Wednesday: 45 min brisk walking or cycling",
      "Thursday: Full-body circuit",
      "Friday: 30 min cardio + flexibility training",
      "Saturday: Rest or light yoga",
      "Sunday: Outdoor activity (hike, walk, etc.)"
    ],
    gain: [
      "Monday: Push (chest, shoulders, triceps)",
      "Tuesday: Pull (back, biceps)",
      "Wednesday: Legs (quads, hamstrings, calves)",
      "Thursday: Rest or active recovery",
      "Friday: Push (heavy strength)",
      "Saturday: Pull (hypertrophy)",
      "Sunday: Legs + core finisher"
    ],
    maintain: [
      "Monday: Full-body strength",
      "Tuesday: 20 min HIIT cardio",
      "Wednesday: Rest or light stretch",
      "Thursday: Full-body dumbbell workout",
      "Friday: Core + mobility",
      "Saturday: Outdoor activity",
      "Sunday: Rest"
    ]
  };

  return `
    <strong>Weekly Plan:</strong><br>
    <ul>
      ${plans[goal].map(day => `<li>${day}</li>`).join("")}
    </ul>
  `;
}

// Theme toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// On load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  const saved = localStorage.getItem("lastPlan");
  if (saved) {
    const { html } = JSON.parse(saved);
    document.getElementById("output").innerHTML = `<h3>Last Saved Plan:</h3><p>${html}</p>`;
  }
});

document.getElementById("gptButton").addEventListener("click", async () => {
  const question = document.getElementById("gptInput").value;
  const gptOutput = document.getElementById("gptOutput");
  gptOutput.innerHTML = "⌛ Thinking...";

  try {
    const response = await fetch("http://localhost:3000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    gptOutput.innerHTML = data.reply || "❌ No response.";
  } catch (err) {
    gptOutput.innerHTML = "❌ Error.";
  }
});


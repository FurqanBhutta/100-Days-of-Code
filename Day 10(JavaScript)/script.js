const marksInput = document.getElementById("marks");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
    let marks = Number(marksInput.value);

    if (marks < 0 || marks > 100) {
        result.innerText = "Please enter marks between 0 and 100.";
    }
    else if (marks >= 90) {
        result.innerText = "Grade: A+ 🎉";
    }
    else if (marks >= 80) {
        result.innerText = "Grade: A";
    }
    else if (marks >= 70) {
        result.innerText = "Grade: B";
    }
    else if (marks >= 60) {
        result.innerText = "Grade: C";
    }
    else if (marks >= 50) {
        result.innerText = "Grade: D";
    }
    else {
        result.innerText = "Grade: F ❌";
    }
});
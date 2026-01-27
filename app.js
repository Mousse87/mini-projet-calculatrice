let currentInput = "";
let history = JSON.parse(localStorage.getItem("miage_calc_history")) || [];

// Charger l'historique au démarrage
renderHistory();

function append(char) {
    currentInput += char;
    updateDisplay();
}

function clearAll() {
    currentInput = "";
    document.getElementById("exp").innerText = "";
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("res").innerText = currentInput || "0";
}

function calculate() {
    try {
        let expression = currentInput.replace('×', '*').replace('÷', '/');
        let result = eval(expression);
        
        // Afficher l'expression en haut
        document.getElementById("exp").innerText = currentInput;
        
        // Gérer l'historique
        addToHistory(currentInput, result);
        
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        document.getElementById("res").innerText = "Erreur";
        currentInput = "";
    }
}

function addToHistory(op, res) {
    const calculation = { op: op, res: res };
    history.unshift(calculation); // Ajouter au début
    
    if (history.length > 3) {
        history.pop(); // Ne garder que les 3 derniers (Partie 2 de l'énoncé)
    }
    
    localStorage.setItem("miage_calc_history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById("history-content");
    container.innerHTML = "";
    
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <div class="hist-exp">${item.op}</div>
            <div class="hist-res">${item.res}</div>
        `;
        container.appendChild(div);
    });
}
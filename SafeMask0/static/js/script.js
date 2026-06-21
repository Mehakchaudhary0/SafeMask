let currentInput = "";
let displayValue = "0";
let calculatorMemory = 0; // The hidden storage for M+, M-, etc.

function press(val) {
    const display = document.getElementById('result');
    if (currentInput === "0") currentInput = "";
    currentInput += val;
    display.innerText = currentInput;

    // Secret Codes
    if (currentInput === "9999") { 
        triggerSOS(); 
        clearDisplay(); 
    }
    
    // FIX: Ensure this calls 'openAdmin' as defined below
    if (currentInput === "1212") { 
        openAdmin(); 
        clearDisplay(); 
    }
    
    if (currentInput === "7") { 
        showFakeCall(); 
        clearDisplay();
    }
}
// --- NEW MEMORY FUNCTIONS ---
function memoryClear() {
    calculatorMemory = 0;
    console.log("Memory Cleared");
}

function memoryAdd() {
    let value = parseFloat(document.getElementById('result').innerText) || 0;
    calculatorMemory += value;
    clearDisplay();
}

function memorySubtract() {
    let value = parseFloat(document.getElementById('result').innerText) || 0;
    calculatorMemory -= value;
    clearDisplay();
}

function memoryRecall() {
    currentInput = calculatorMemory.toString();
    document.getElementById('result').innerText = currentInput;
}

// Existing functions...
function clearDisplay() {
    currentInput = "";
    document.getElementById('result').innerText = "0";
}

function clearDisplay() {
    currentInput = "";
    document.getElementById('result').innerText = "0";
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('result').innerText = currentInput || "0";
}

function calculate() {
    try {
        // Use eval safely for basic math
        let result = eval(currentInput.replace('×', '*').replace('÷', '/').replace('−', '-'));
        document.getElementById('result').innerText = result;
        currentInput = result.toString();
    } catch {
        document.getElementById('result').innerText = "Error";
        currentInput = "";
    }
}

function triggerSOS() {
    const dot = document.getElementById('sos-indicator');
    dot.style.display = 'block';
    
    // Green dot disappears after 3 seconds
    setTimeout(() => { dot.style.display = 'none'; }, 3000);

    navigator.geolocation.getCurrentPosition((pos) => {
        fetch('/sos-trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        });
    });
}

// Admin Panel Logic
async function openAdmin() {
    const adminPanel = document.getElementById('admin-panel');
    const list = document.getElementById('log-list');

    try {
        const res = await fetch('/get-logs');
        const logs = await res.json();
        
        if (logs.length === 0) {
            list.innerHTML = "<li>No emergency logs found.</li>";
        } else {
            // Mapping the logs into your list
            list.innerHTML = logs.map(l => `
                <li class="log-item">
                    <span class="log-date">${l.date}</span>
                    <span class="log-time">${l.time}</span>
                    <div class="log-loc">Coord: ${l.lat}, ${l.lon}</div>
                    <a href="${l.map_url}" target="_blank" class="map-link">View Map</a>
                </li>
            `).join('');
        }

        // CRITICAL: Remove the 'hidden' class to show the panel
        adminPanel.classList.remove('hidden');
        // If your CSS uses 'display: none' directly on the ID, use this too:
        adminPanel.style.display = 'block'; 

    } catch (error) {
        console.error("Failed to fetch logs:", error);
        alert("Error accessing secure logs.");
    }
}

function closeAdmin() { document.getElementById('admin-panel').style.display = 'none'; }
function showFakeCall() { document.getElementById('incoming-call').classList.remove('hidden'); }
function endCall() { document.getElementById('incoming-call').classList.add('hidden'); }
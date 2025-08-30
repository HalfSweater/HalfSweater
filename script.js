// --- PART 1: CURSOR GLOW EFFECT ---

(() => {
    const glow = document.getElementById("cursor-glow");

    document.body.addEventListener("mousemove", e => {
        const { clientX, clientY } = e;
        // The CSS transform handles the centering, so we just pass the coordinates
        glow.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
})();


// --- PART 2: FORM SUBMISSION LOGIC (UNCHANGED) ---

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const webhookURL = "YOUR_WEBHOOK_URL_HERE"; 
    const statusMessage = document.getElementById('status-message');
    const form = event.target;
    const fullName = form.elements['fullName'].value;
    const age = form.elements['age'].value;
    const email = form.elements['email'].value;
    const ign = form.elements['ign'].value;
    const discordId = form.elements['discordId'].value;

    const payload = {
        username: "Tournament Registration Bot",
        avatar_url: "https://i.imgur.com/4M34hi2.png",
        embeds: [
            {
                title: "New Tournament Registration!",
                color: 4149685, // Hex for the new Indigo color #3F51B5
                fields: [
                    { name: "Full Name", value: fullName, inline: true },
                    { name: "Age", value: age, inline: true },
                    { name: "Email Address", value: email, inline: false },
                    { name: "In-Game Name (IGN)", value: ign, inline: true },
                    { name: "Discord ID", value: discordId, inline: true }
                ],
                footer: { text: `Registration received at: ${new Date().toLocaleString()}` }
            }
        ]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            statusMessage.textContent = "Registration successful! Check Discord.";
            statusMessage.style.color = "#4CAF50";
            form.reset();
        } else {
            statusMessage.textContent = "Something went wrong. Please try again.";
            statusMessage.style.color = "#f44336";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        statusMessage.textContent = "An error occurred. Check console and try again.";
        statusMessage.style.color = "#f44336";
    });
});

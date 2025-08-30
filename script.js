// --- PART 1: PARTICLE ANIMATION INITIALIZATION ---

tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
        color: "#000"
    },
    particles: {
        number: {
            value: 80, // Number of particles
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00BFFF" // Particle color
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3,
            random: true,
        },
        move: {
            enable: true,
            speed: 1, // Particle speed
            direction: "none",
            out_mode: "out",
            bounce: false,
        },
        // This makes the particles connect with lines
        links: {
            enable: true,
            distance: 150,
            color: "#00BFFF",
            opacity: 0.4,
            width: 1
        }
    },
    // This section makes the particles react to your mouse
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse" // Pushes particles away from the cursor
            },
            onclick: {
                enable: true,
                mode: "push" // Adds new particles on click
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100
            },
            push: {
                quantity: 4
            }
        }
    },
    detectRetina: true,
});


// --- PART 2: FORM SUBMISSION LOGIC (UNCHANGED) ---

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1410313114809008158/FUvA8bxgD8Q8ASDWBWveeGabGgHIowHGfcXlkTpPdmeYgXzZDnBKzHnkGHWUf7NB0xTz"; 
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
                color: 4886754, // Hex color for the blue: #4A90E2
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

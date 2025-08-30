document.getElementById('registration-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (page refresh)
    event.preventDefault();

    // --- IMPORTANT: PASTE YOUR DISCORD WEBHOOK URL HERE ---
    const webhookURL = "https://discord.com/api/webhooks/1410313114809008158/FUvA8bxgD8Q8ASDWBWveeGabGgHIowHGfcXlkTpPdmeYgXzZDnBKzHnkGHWUf7NB0xTz"; 
    // ---------------------------------------------------------

    const statusMessage = document.getElementById('status-message');

    // Get form data
    const form = event.target;
    const fullName = form.elements['fullName'].value;
    const age = form.elements['age'].value;
    const email = form.elements['email'].value;
    const ign = form.elements['ign'].value;
    const discordId = form.elements['discordId'].value;

    // Create the payload for Discord (using an "embed" for nice formatting)
    const payload = {
        username: "Tournament Registration Bot",
        avatar_url: "https://i.imgur.com/4M34hi2.png", // A simple Minecraft icon
        embeds: [
            {
                title: "New Tournament Registration!",
                color: 5814783, // A nice hex color (e.g., #58b9ff)
                fields: [
                    {
                        name: "Full Name",
                        value: fullName,
                        inline: true
                    },
                    {
                        name: "Age",
                        value: age,
                        inline: true
                    },
                    {
                        name: "Email Address",
                        value: email,
                        inline: false
                    },
                    {
                        name: "In-Game Name (IGN)",
                        value: ign,
                        inline: true
                    },
                    {
                        name: "Discord ID",
                        value: discordId,
                        inline: true
                    }
                ],
                footer: {
                    text: `Registration received at: ${new Date().toLocaleString()}`
                }
            }
        ]
    };

    // Send the data to the webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            statusMessage.textContent = "Registration successful! Check the Discord for confirmation.";
            statusMessage.style.color = "#4CAF50"; // Green for success
            form.reset(); // Clear the form
        } else {
            statusMessage.textContent = "Something went wrong. Please try again later.";
            statusMessage.style.color = "#f44336"; // Red for error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        statusMessage.textContent = "An error occurred. Please check the console and try again.";
        statusMessage.style.color = "#f44336";
    });
});

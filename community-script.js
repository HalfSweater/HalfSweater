// --- PART 1: CURSOR GLOW EFFECT (Copied from script.js for theme consistency) ---
(() => {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return; // Exit if the element doesn't exist

    document.body.addEventListener("mousemove", e => {
        const { clientX, clientY } = e;
        glow.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
})();


// --- PART 2: DISCORD WIDGET API LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://discord.com/api/guilds/1394714934960721981/widget.json';

    // Get references to the HTML elements we need to update
    const serverNameEl = document.getElementById('server-name');
    const onlineCountEl = document.getElementById('online-count');
    const memberListEl = document.getElementById('member-list');

    async function fetchDiscordData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();

            // Update the server name and online count
            serverNameEl.textContent = data.name || 'Unknown Server';
            onlineCountEl.innerHTML = `<span class="dot"></span>${data.presence_count || 0} Online`;

            // Clear the "loading" message
            memberListEl.innerHTML = '';

            // Populate the member list
            if (data.members && data.members.length > 0) {
                data.members.forEach(member => {
                    // Create list item
                    const li = document.createElement('li');
                    li.className = 'member-item';

                    // Create avatar image
                    const avatar = document.createElement('img');
                    avatar.className = 'member-avatar';
                    avatar.src = member.avatar_url;
                    avatar.alt = `${member.username}'s avatar`;

                    // Create username span
                    const name = document.createElement('span');
                    name.className = 'member-name';
                    name.textContent = member.username;

                    // Append elements
                    li.appendChild(avatar);
                    li.appendChild(name);
                    memberListEl.appendChild(li);
                });
            } else {
                memberListEl.innerHTML = '<li class="loading-state">No members are currently visible.</li>';
            }

        } catch (error) {
            console.error('Failed to fetch Discord data:', error);
            serverNameEl.textContent = 'Error Loading Widget';
            memberListEl.innerHTML = '<li class="loading-state">Could not fetch data from Discord API.</li>';
        }
    }

    fetchDiscordData();
});

const apiUrlUsers = 'http://localhost:8000/users';
const apiUrlClans = 'http://localhost:8000/clans';


async function loadData() {
    try {
        const responseUsers = await fetch(`${apiUrlUsers}?is_active=true`);
        const responseClans = await fetch(`${apiUrlClans}?is_active=true`);

        const users = await responseUsers.json();
        const clans = await responseClans.json();

        const selectClan = document.getElementById('selectClan');
        clans.forEach(clan => {
            const optionClan = document.createElement('option')

            optionClan.textContent(clan.name);
            selectClan.appendChild(optionClan)

        });

    } catch (err) {
        console.error('Error al cargar usuarios: ', err);
    }
}

document.addEventListener("DOMContentLoaded", loadData);
const apiUrlUsers = 'http://localhost:8000/users';
const apiUrlClans = 'http://localhost:8000/clans';

async function loadUsers() {
    try {
        const responseUsers = await fetch(`${apiUrlUsers}?is_active=true`);
        const responseClans = await fetch(`${apiUrlClans}?is_active=true`);

        const users = await responseUsers.json();
        const clans = await responseClans.json();
        const tbody = document.querySelector('#user-table tbody');
        tbody.innerHTML = "";

        users.forEach(user => {
            const relationWithClans = clans.find((e) => e.id == user.clan_id);
            const row = document.createElement('tr');
            const clanName = relationWithClans ? relationWithClans.name : 'Sin clan';

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${clanName}</td>
                <td>${user.knowledges.join(' - ')}</td>
                <td>
                    <button type='submit' class='btn btn-warning'>Editar</button>
                    <button type='submit' class='btn btn-danger'>Eliminar</button>
                </td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.error('Error al cargar usuarios: ', err);
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);
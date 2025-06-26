const apiUrlUsers = 'http://localhost:8000/users';
const apiUrlClans = 'http://localhost:8000/clans';

const userForm = document.getElementById('userForm');

async function loadData() {
    try {
        // const responseUsers = await fetch(`${apiUrlUsers}?is_active=true`);
        const responseClans = await fetch(`${apiUrlClans}?is_active=true`);

        // const users = await responseUsers.json();
        const clans = await responseClans.json();

        const selectClan = document.getElementById('selectClan');
        clans.forEach(clan => {
            const optionClan = document.createElement('option');
            optionClan.textContent = clan.name;
            optionClan.value = clan.id
            selectClan.appendChild(optionClan);

        });

    } catch (err) {
        console.error('Error al cargar usuarios: ', err);
    }
}

// 
async function createUser (event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const clanId = document.getElementById('selectClan').value; 

    const knowledgesSelect = document.getElementById('knowledges');
    const selectedKnowledges = []; 

    for (let i = 0; i < knowledgesSelect.options.length; i++) {
        if (knowledgesSelect.options[i].selected) {
            selectedKnowledges.push(knowledgesSelect.options[i].value);
        }
    }

    const newUser = {
        name: name,
        email: email,
        knowledges: selectedKnowledges,
        clan_id: clanId,
        is_active: true
    };

    try {
        const response = await fetch(apiUrlUsers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newUser) 
        });

        const createdUser = await response.json();
        console.log('Usuario creado exitosamente: ', createdUser);

        userForm.reset(); 
        alert('Usuario creado con éxito!');

    } catch (error) {
        console.error('Error al registrar el usuario: ', error);
    }
}

document.addEventListener("DOMContentLoaded", loadData);

if (userForm) {
    userForm.addEventListener("submit", createUser);
} else {
    console.log('no se encontró el Formulario de usuarios')
}

// Edit User

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const ingredientsContainer = document.getElementById('ingredients-container');
    const addIngredientBtn = document.getElementById('addIngredient');

    // Ajout dynamique d’un groupe d’ingrédients
    addIngredientBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('ingredient-group');
        div.innerHTML = `
        <input type="text" name="nameIngredient" placeholder="Ingrédient" required>
        <input type="number" name="qtyIngredient" placeholder="Quantité" required>
        <button type="button" class="remove">🗑️</button>`;
        ingredientsContainer.appendChild(div);

        div.querySelector('.remove').addEventListener('click', () => div.remove());
    });

    // Function pour envoyer le formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const instructions = document.getElementById('instructions').value;
        const difficulty = document.getElementById('difficulty').value;

        const ingredients = Array.from(document.querySelectorAll('.ingredient-group')).map(group => {
            const name = group.querySelector('input[name="nameIngredient"]').value;
            const qty = parseFloat(group.querySelector('input[name="qtyIngredient"]').value);
            return { name, qty };
        });

        const recette = { title, instructions, difficulty, ingredients };

        try {
            const res = await fetch('http://localhost:3000/recettes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recette)
            });

            const data = await res.json();
            console.log('✅ Recette créée :', data);
            afficherRecettes();

            form.reset();
            ingredientsContainer.innerHTML = '';
            addIngredientBtn.click();

        } catch (err) {
            console.error('❌ Erreur envoi recette :', err);
        }
    });

    const recettesContainer = document.getElementById('recettes-container');

    // Fonction pour afficher les recettes
    async function afficherRecettes() {
        try {
            const res = await fetch('http://localhost:3000/recettes');
            const recettes = await res.json();

            recettesContainer.innerHTML = '';

            recettes.forEach(recette => {
                const div = document.createElement('div');
                div.classList.add('recette');

                const titre = `<h3>${recette.title}</h3>`;
                const instructions = `<p><strong>Instructions :</strong> ${recette.instructions}</p>`;
                const difficulty = `<p><strong>Difficulté :</strong> ${recette.difficulty}</p>`;

                let ingredientsHTML = `<ul>`;
                recette.ingredients.forEach(ing => {
                    ingredientsHTML += `<li>${ing.name} – ${ing.qty}</li>`;
                });
                ingredientsHTML += `</ul>`;

                const btnDetail = document.createElement('button');
                btnDetail.textContent = 'Détails';

                const btnModify = document.createElement('button');
                btnModify.textContent = 'Modifier';

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Supprimer';

                btnDelete.addEventListener('click', (e) => {
                    deleteRecette(recette._id, div);
                })


                div.innerHTML = titre + instructions + difficulty + `<strong>Ingrédients :</strong>` + ingredientsHTML;

                recettesContainer.appendChild(div);

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('recette-buttons');

                buttonContainer.appendChild(btnDetail);
                buttonContainer.appendChild(btnModify);
                buttonContainer.appendChild(btnDelete);

                div.appendChild(buttonContainer);

            });

        } catch (err) {
            console.error('❌ Erreur récupération recettes :', err);
        }
    }


    // Fonction pour supprimer une recette
    async function deleteRecette(recetteId, divRecette) {
        try {
            const res = await fetch(`http://localhost:3000/recettes/${recetteId}`, {
                method: 'DELETE'
            });
            divRecette.remove();
            const data = await res.json();
            console.log('✅ Recette supprimée :', data);
        } catch (err) {
            console.error(' Erreur lors de la suppression :', err);
        }
    }
    afficherRecettes();

});
 



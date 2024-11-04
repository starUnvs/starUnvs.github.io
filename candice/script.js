document.querySelectorAll('.card').forEach(card => {
    const question = card.getAttribute('data-question');
    const options = JSON.parse(card.getAttribute('data-options'));
    const cardId = card.getAttribute('data-id');

    const questionElem = card.querySelector('.question');
    const optionsElem = card.querySelector('.options');
    const resultsElem = card.querySelector('.results');

    questionElem.textContent = question;

    let voteCounts = JSON.parse(localStorage.getItem(`votes_${cardId}`)) || { A: 0, B: 0, C: 0, D: 0 };

    optionsElem.innerHTML = Object.entries(options).map(([key, value]) => `
        <button class="vote-option" data-option="${key}">${value}</button>
    `).join('');

    optionsElem.querySelectorAll('.vote-option').forEach(optionButton => {
        optionButton.addEventListener('click', () => {
            const option = optionButton.getAttribute('data-option');
            const userVoteKey = `user_vote_${cardId}`;

            if (localStorage.getItem(userVoteKey)) {
                alert('You have already voted for this question.');
                return;
            }

            voteCounts[option]++;
            localStorage.setItem(`votes_${cardId}`, JSON.stringify(voteCounts));
            localStorage.setItem(userVoteKey, true);

            displayResults();
        });
    });

    function displayResults() {
        resultsElem.innerHTML = `
            <h4>Results:</h4>
            ${Object.entries(options).map(([key, value]) => `
                <p>${value}: ${voteCounts[key]} votes</p>
            `).join('')}
        `;
    }

    displayResults();
});

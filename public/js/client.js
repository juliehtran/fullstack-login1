document.querySelectorAll(`.option`).forEach((option) => {
    option.addEventListener(`click`, onOptionClicked)
})

function onOptionClicked(event) {
    const choice = event.target.innerText
    const question = document.querySelector(`.question`).innerText

    // this button makes a choice
    // "choice" is the resource that we are creating here
    // since we are creating something, we want to use POST (instead of PUT/GET/DELETE)
    fetch(`/choice`, {
        method: `POST`,
        body: JSON.stringify({ choice: choice, question: question }),
        headers: { "Content-Type": `application/json` }
    })
        .then(response => response.json())
        .then(response => {
            window.location.reload()
        })
}

document.querySelector('.logout').addEventListener('click', logOut)

function logOut() {
    fetch('/logout').then(() => window.location.reload())
}

document.querySelector('.delete-button').addEventListener('click', onDeleteClicked)

function onDeleteClicked(event) {
    const deleteButton = event.target
    const answerCard = deleteButton.closest('.answer-card')
    const id = answerCard.dataset.id
    fetch('/choice', {
        method: `DELETE`,
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": `application/json` }
    }).then(() => window.location.reload())
}
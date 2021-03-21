document.querySelectorAll(`.option`).forEach((option) => {
    option.addEventListener(`click`, onOptionClicked)
})

function onOptionClicked(event) {
    const option = event.target.innerText

    // this button makes a choice
    // "choice" is the resource that we are creating here
    // since we are creating something, we want to use POST (instead of PUT/GET/DELETE)
    fetch(`/choice`, { method: `POST`, body: option })
        .then(response => response.json())
        .then(response => {
            // TODO: do something, not sure what yet...
            console.log(response)
        })
}


document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", function() {
        const eventId = this.getAttribute("id");
        window.location.href = `/event/${eventId}/`;
    });
});

    
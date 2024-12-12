
const readMoreButtons = document.querySelectorAll(".read-more");

    readMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const extraText = button.previousElementSibling; // Get the corresponding 'extra-text'
            if (extraText.classList.contains("hidden")) {
                extraText.classList.remove("hidden");
                button.textContent = "Read Less";
            } else {
                extraText.classList.add("hidden");
                button.textContent = "Read More";
            }
        });
    });
    
    // Get the button
    let mybutton = document.getElementById("goTop");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block"; // Show button
        } else {
            mybutton.style.display = "none"; // Hide button
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

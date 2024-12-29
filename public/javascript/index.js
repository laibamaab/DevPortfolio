 document.addEventListener("DOMContentLoaded", function() {
          // Function to toggle the dropdown and the arrow rotation
          function toggleDropdown() {
            const dropdownContainer = document.getElementById("dropdown-container");
            const dropdown = document.getElementById("dropdownOptions");
            const arrow = document.getElementById("arrow");
            if (dropdownContainer && dropdown && arrow) {
              dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
              dropdownContainer.classList.toggle("open");
              arrow.classList.toggle("open");
            } else {
              console.error("dropdownContainer, dropdown, or arrow is missing.");
            }
          }
          function toggleDropdown2() {
            const pdropdownContainer = document.getElementById("p-dropdown-container");
            const pdropdown = document.getElementById("p-dropdownOptions");
            const parrow = document.getElementById("p-arrow");
            if (pdropdownContainer && pdropdown && parrow) {
                pdropdown.style.display = (pdropdown.style.display === "block") ? "none" : "block";
                pdropdownContainer.classList.toggle("open");
                parrow.classList.toggle("open");
              } else {
                console.error("dropdownContainer, dropdown, or arrow is missing.");
              }
          }
          // Add event listeners
          const configElement = document.getElementById("config");
          if (configElement) {
            configElement.addEventListener("click", toggleDropdown);
          }
          const pconfigElement = document.getElementById("p-config");
          if (pconfigElement) {
            pconfigElement.addEventListener("click", toggleDropdown2);
          }
    
    });
      
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

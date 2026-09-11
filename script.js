

    // Mobile Navigation

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    // Close mobile menu after clicking link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


    // Appointment Form

    const appointmentForm =
        document.getElementById("appointmentForm");

    appointmentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Thank you! Your appointment request has been received. Our clinic team will contact you shortly."
        );

        appointmentForm.reset();

    });



/* =====================================================
   NEUROCENTRE CLINIC HOURS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const clinicStatus =
        document.getElementById("clinicStatus");

    const dayRows =
        document.querySelectorAll(".day-row");

    const now = new Date();

    const day = now.getDay();

    const hour = now.getHours();

    const minute = now.getMinutes();

    const currentMinutes =
        hour * 60 + minute;


    /*
        JavaScript:

        Sunday    = 0
        Monday    = 1
        Tuesday   = 2
        Wednesday = 3
        Thursday  = 4
        Friday    = 5
        Saturday  = 6
    */


    /* ================= TODAY HIGHLIGHT ================= */

    if (day >= 1 && day <= 6) {

        const weekdayRow =
            document.querySelector(".current-hours .day-row:first-of-type");

        if (weekdayRow) {

            weekdayRow.classList.add("today");

        }

    }


    /* ================= CLINIC STATUS ================= */

    if (day === 0) {

        clinicStatus.textContent =
            "Closed Today";

        return;

    }


    /*
        Current visiting time:

        5:30 PM = 17:30 = 1050 minutes

        8:30 PM = 20:30 = 1230 minutes
    */

    const openingTime = 17 * 60 + 30;

    const closingTime = 20 * 60 + 30;


    if (
        currentMinutes >= openingTime &&
        currentMinutes < closingTime
    ) {

        clinicStatus.textContent =
            "Open Now";

    }

    else if (currentMinutes < openingTime) {

        clinicStatus.textContent =
            "Opens at 5:30 PM";

    }

    else {

        clinicStatus.textContent =
            "Closed Now";

    }

});


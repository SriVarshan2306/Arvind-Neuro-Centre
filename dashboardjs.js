    let patients = [

        {
            id: 1,
            name: "Eleanor Vance",
            ageGender: "64F",
            dob: "1962-04-18",
            doctor: "Dr. Aris",
            specialty: "Stroke Specialist",
            type: "Urgent Post-Stroke Evaluation",
            room: "Room 1",
            complaint: "Right-side weakness & gait difficulty",
            status: "Urgent / Priority",
            priority: true
        },

        {
            id: 2,
            name: "Michael Chen",
            ageGender: "42M",
            dob: "1984-02-11",
            doctor: "Dr. Chen",
            specialty: "Epilepsy Specialist",
            type: "Routine EEG",
            room: "EEG Room 3",
            complaint: "Breakthrough seizure episodes",
            status: "Scheduled",
            priority: false
        },

        {
            id: 3,
            name: "Priya Raman",
            ageGender: "37F",
            dob: "1989-07-22",
            doctor: "Dr. Meera",
            specialty: "Movement Disorders",
            type: "Movement Disorder Review",
            room: "Room 2",
            complaint: "Tremors & gait issues",
            status: "Arrived / Waiting",
            priority: false
        },

        {
            id: 4,
            name: "Robert Wilson",
            ageGender: "71M",
            dob: "1955-01-09",
            doctor: "Dr. Aris",
            specialty: "Stroke Specialist",
            type: "Post-Stroke Follow-up",
            room: "Room 1",
            complaint: "Speech recovery monitoring",
            status: "With Neurologist",
            priority: false
        },

        {
            id: 5,
            name: "Sofia Martinez",
            ageGender: "29F",
            dob: "1997-11-03",
            doctor: "Dr. Rao",
            specialty: "General Neurology",
            type: "Chronic Migraine Review",
            room: "Room 4",
            complaint: "Migraine aura & visual disturbance",
            status: "Scheduled",
            priority: false
        },

        {
            id: 6,
            name: "James Anderson",
            ageGender: "58M",
            dob: "1968-06-15",
            doctor: "Dr. Chen",
            specialty: "Epilepsy Specialist",
            type: "Epilepsy Follow-up",
            room: "Room 2",
            complaint: "Medication review after seizure",
            status: "Completed",
            priority: false
        },

        {
            id: 7,
            name: "Anita Krishnan",
            ageGender: "52F",
            dob: "1974-09-28",
            doctor: "Dr. Rao",
            specialty: "General Neurology",
            type: "Memory Assessment",
            room: "Room 4",
            complaint: "Short-term memory concerns",
            status: "Scheduled",
            priority: false
        },

        {
            id: 8,
            name: "Daniel Brooks",
            ageGender: "46M",
            dob: "1980-03-12",
            doctor: "Dr. Meera",
            specialty: "Movement Disorders",
            type: "Tremor Evaluation",
            room: "Room 2",
            complaint: "Hand tremor during movement",
            status: "Arrived / Waiting",
            priority: false
        }

    ];


    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

    const tableBody =
        document.getElementById("patientTableBody");

    const searchInput =
        document.getElementById("globalSearch");

    const emptyState =
        document.getElementById("emptyState");

    const totalPatients =
        document.getElementById("totalPatients");

    const inConsultation =
        document.getElementById("inConsultation");

    const roomsActive =
        document.getElementById("roomsActive");

    const urgentCount =
        document.getElementById("urgentCount");

    const queueSummary =
        document.getElementById("queueSummary");

    const walkinModal =
        document.getElementById("walkinModal");

    const walkinForm =
        document.getElementById("walkinForm");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =========================================================
       STATUS CLASS
    ========================================================= */

    function getStatusClass(status) {

        switch (status) {

            case "Scheduled":
                return "status-scheduled";

            case "Arrived / Waiting":
                return "status-waiting";

            case "With Neurologist":
                return "status-neurologist";

            case "Completed":
                return "status-completed";

            case "Urgent / Priority":
                return "status-urgent";

            default:
                return "status-scheduled";
        }
    }


    /* =========================================================
       INITIALS
    ========================================================= */

    function getInitials(name) {

        return name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    }


    /* =========================================================
       ESCAPE HTML
    ========================================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =========================================================
       FORMAT DATE
    ========================================================= */

    function formatDOB(dateString) {

        if (!dateString) {
            return "DOB not provided";
        }

        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =========================================================
       RENDER TABLE
    ========================================================= */

    function renderTable() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        const filteredPatients =
            patients.filter(patient => {

                const searchableText = [

                    patient.name,

                    patient.dob,

                    formatDOB(patient.dob),

                    patient.doctor,

                    patient.specialty

                ]
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(searchTerm);

            });


        tableBody.innerHTML = "";


        filteredPatients.forEach(patient => {

            const row =
                document.createElement("tr");


            if (patient.priority) {
                row.classList.add("priority-row");
            }


            const isCheckedIn =
                patient.status === "Arrived / Waiting";


            row.innerHTML = `

                <td>

                    <div class="patient">

                        <div class="patient-avatar">
                            ${escapeHTML(getInitials(patient.name))}
                        </div>

                        <div>

                            <div class="patient-name">
                                ${escapeHTML(patient.name)}
                            </div>

                            <div class="patient-meta">
                                ${escapeHTML(patient.ageGender)}
                                • DOB ${escapeHTML(formatDOB(patient.dob))}
                            </div>

                            ${
                                patient.priority
                                ?
                                `
                                <div class="priority-label">
                                    <i class="fa-solid fa-triangle-exclamation"></i>
                                    PRIORITY
                                </div>
                                `
                                :
                                ""
                            }

                        </div>

                    </div>

                </td>


                <td>

                    <span class="doctor-name">
                        ${escapeHTML(patient.doctor)}
                    </span>

                    <span class="doctor-specialty">
                        ${escapeHTML(patient.specialty)}
                    </span>

                </td>


                <td>

                    <div class="appointment-type">
                        ${escapeHTML(patient.type)}
                    </div>

                    <span class="room">
                        <i class="fa-solid fa-door-open"></i>
                        ${escapeHTML(patient.room)}
                    </span>

                </td>


                <td>

                    <div class="complaint">

                        ${
                            patient.priority
                            ?
                            `
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            `
                            :
                            `
                            <i class="fa-solid fa-circle-info"></i>
                            `
                        }

                        <span>
                            ${escapeHTML(patient.complaint)}
                        </span>

                    </div>

                </td>


                <td>

                    <span
                        class="status-badge ${getStatusClass(patient.status)}"
                    >

                        <select
                            class="status-select"
                            data-id="${patient.id}"
                            aria-label="Change patient status"
                        >

                            <option
                                value="Scheduled"
                                ${patient.status === "Scheduled" ? "selected" : ""}
                            >
                                Scheduled
                            </option>

                            <option
                                value="Arrived / Waiting"
                                ${patient.status === "Arrived / Waiting" ? "selected" : ""}
                            >
                                Arrived / Waiting
                            </option>

                            <option
                                value="With Neurologist"
                                ${patient.status === "With Neurologist" ? "selected" : ""}
                            >
                                With Neurologist
                            </option>

                            <option
                                value="Completed"
                                ${patient.status === "Completed" ? "selected" : ""}
                            >
                                Completed
                            </option>

                            <option
                                value="Urgent / Priority"
                                ${patient.status === "Urgent / Priority" ? "selected" : ""}
                            >
                                Urgent / Priority
                            </option>

                        </select>

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="quick-checkin ${isCheckedIn ? "checked" : ""}"
                        data-checkin="${patient.id}"
                        ${isCheckedIn ? "disabled" : ""}
                    >

                        ${
                            isCheckedIn
                            ?
                            `
                            <i class="fa-solid fa-check"></i>
                            Waiting
                            `
                            :
                            `
                            <i class="fa-solid fa-person-circle-check"></i>
                            Quick Check-In
                            `
                        }

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        emptyState.style.display =
            filteredPatients.length === 0
            ? "block"
            : "none";


        updateMetrics();

    }


    /* =========================================================
       UPDATE METRICS
    ========================================================= */

    function updateMetrics() {

        totalPatients.textContent =
            patients.length;


        const consultationCount =
            patients.filter(
                patient =>
                    patient.status === "With Neurologist"
            ).length;

        inConsultation.textContent =
            consultationCount;


        const activeRooms =
            patients.filter(patient => {

                const room = patient.room.toLowerCase();

                return (
                    (
                        patient.status === "With Neurologist"
                    )
                    &&
                    (
                        room.includes("eeg") ||
                        room.includes("mri")
                    )
                );

            }).length;

        roomsActive.textContent =
            activeRooms;


        const urgent =
            patients.filter(
                patient =>
                    patient.priority ||
                    patient.status === "Urgent / Priority"
            ).length;

        urgentCount.textContent =
            urgent;


        const waiting =
            patients.filter(
                patient =>
                    patient.status === "Arrived / Waiting"
            ).length;


        queueSummary.textContent =
            `${patients.length} patients today • ${waiting} currently waiting`;

    }


    /* =========================================================
       STATUS CHANGE
    ========================================================= */

    tableBody.addEventListener(
        "change",
        function(event) {

            if (
                !event.target.classList.contains("status-select")
            ) {
                return;
            }


            const id =
                Number(event.target.dataset.id);

            const newStatus =
                event.target.value;


            const patient =
                patients.find(
                    item => item.id === id
                );


            if (!patient) {
                return;
            }


            patient.status =
                newStatus;


            /*
             * If receptionist manually changes status to
             * Urgent / Priority, make it a priority row.
             */

            if (
                newStatus === "Urgent / Priority"
            ) {

                patient.priority = true;

            }


            /*
             * If completed, remove priority.
             */

            if (
                newStatus === "Completed"
            ) {

                patient.priority = false;

            }


            renderTable();


            showToast(
                `${patient.name} status changed to ${newStatus}`
            );

        }
    );


    /* =========================================================
       QUICK CHECK-IN
    ========================================================= */

    tableBody.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "[data-checkin]"
                );


            if (!button) {
                return;
            }


            const id =
                Number(button.dataset.checkin);


            const patient =
                patients.find(
                    item => item.id === id
                );


            if (!patient) {
                return;
            }


            patient.status =
                "Arrived / Waiting";


            patient.priority = false;


            renderTable();


            showToast(
                `${patient.name} checked in and added to waiting room`
            );

        }
    );


    /* =========================================================
       GLOBAL SEARCH
    ========================================================= */

    searchInput.addEventListener(
        "input",
        renderTable
    );


    /* =========================================================
       TOAST MESSAGE
    ========================================================= */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2800);

    }


    /* =========================================================
       MODAL OPEN / CLOSE
    ========================================================= */

    function openModal() {

        walkinModal.classList.add("show");

        walkinModal.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {

            document
                .getElementById("walkinName")
                .focus();

        }, 50);

    }


    function closeModal() {

        walkinModal.classList.remove("show");

        walkinModal.setAttribute(
            "aria-hidden",
            "true"
        );

        walkinForm.reset();

    }


    document
        .getElementById("openWalkin")
        .addEventListener(
            "click",
            openModal
        );


    document
        .getElementById("closeWalkin")
        .addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById("cancelWalkin")
        .addEventListener(
            "click",
            closeModal
        );


    /* Close when clicking outside modal */

    walkinModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === walkinModal
            ) {

                closeModal();

            }

        }
    );


    /* Escape key */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                walkinModal.classList.contains("show")
            ) {

                closeModal();

            }

        }
    );


    /* =========================================================
       CREATE NEW WALK-IN
    ========================================================= */

    walkinForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("walkinName")
                    .value
                    .trim();


            const ageGender =
                document
                    .getElementById("walkinAgeGender")
                    .value
                    .trim();


            const dob =
                document
                    .getElementById("walkinDob")
                    .value;


            const doctorValue =
                document
                    .getElementById("walkinDoctor")
                    .value;


            const type =
                document
                    .getElementById("walkinType")
                    .value;


            const room =
                document
                    .getElementById("walkinRoom")
                    .value;


            const complaint =
                document
                    .getElementById("walkinComplaint")
                    .value
                    .trim();


            if (
                !name ||
                !ageGender ||
                !doctorValue ||
                !type ||
                !complaint
            ) {

                return;

            }


            const [
                doctor,
                specialty
            ] = doctorValue.split("|");


            const newPatient = {

                id:
                    Date.now(),

                name,

                ageGender,

                dob,

                doctor,

                specialty,

                type,

                room,

                complaint,

                status:
                    "Urgent / Priority",

                priority:
                    true

            };


            /*
             * unshift() places the new patient
             * at the very top.
             */

            patients.unshift(
                newPatient
            );


            /*
             * Clear search so the new row
             * is immediately visible.
             */

            searchInput.value = "";


            renderTable();


            closeModal();


            showToast(
                `${name} added as a priority walk-in`
            );

        }
    );


    /* =========================================================
       REFRESH BUTTON
    ========================================================= */

    document
        .getElementById("refreshBtn")
        .addEventListener(
            "click",
            function() {

                renderTable();

                showToast(
                    "Patient queue refreshed"
                );

            }
        );


    /* =========================================================
       INITIAL RENDER
    ========================================================= */

    renderTable();


document.addEventListener("DOMContentLoaded", function () {                                       //Wait for page to load fully
    const form = document.getElementById("myForm");

    const fields = [                                                                              //Array for holding user input, RegExp validation & Error message
        { id: "fullName", regexp: /^[A-Za-z\s]+$/, error: "Only letters and spaces allowed." },
        { id: "email", regexp: /^\S+@\S+\.\S+$/, error: "Enter a valid email address." },
        { id: "phone", regexp: /^\d{10,15}$/, error: "Phone must be 10-15 digits." },
        { id: "password", regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, error:
              "Must be 8+ chars, include 1 uppercase, 1 lowercase, 1 number." }
    ];
    /*  /^[A-Za-z\s]+$/ - /^ start of string, [A-Za-z\s] ensures a-z, A-Z and \s for spaces, + min 1 char, $/ End of string
        /^\S+@\S+\.\S+$/ - /^ start of string, \S+ ensures a non-space char, @ char, \S+ ensures a non-space char after @,
                          \. ensures dot, \S+ non-space char, $/end
        /^\d{10, 15}$/ - /^ start string, \d allows digits, {10, 15} char count, $/ end of str
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/ - /^ string start, (?=.*[a-z]) ensures a lowercase letter, 
                         (?=.*[A-Z]) ensures an uppercase letter, (?=.*\d) ensure integers only,
                         [A-Za-z\d]{8,} allows min 8 chars, $/ end str
    */

    // Function to Validate fields
    function validateField(field) {
        const input = document.getElementById(field.id);
        const errorType = document.getElementById(field.id + "Error");
        const value = input.value.trim();

        if (!field.regexp.test(value)) {
            input.classList.add("error");
            errorType.textContent = field.error;
            return false;
        } else {
            input.classList.remove("error");
            errorType.textContent = "";
            return true;
        }
    }
    // Real-time Validation 
    fields.forEach(field => {
        document.getElementById(field.id).addEventListener("input", function () {
            validateField(field);
        });
    });
    // Validate fields on submission
    form.addEventListener("submit", function (event) {
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        if (!isValid) {
            event.preventDefault(); // Stop form submission if invalid
        } else {
            alert("Form submitted successfully!");
        }
    });
});

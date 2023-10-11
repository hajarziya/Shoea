
document.addEventListener("DOMContentLoaded", function () {
    const applyButton = document.querySelector(".btn__gopayment");
    const addressBoxes = document.querySelectorAll(".address__box");

    applyButton.addEventListener("click", function () {

        let selectedAddress = "";
        addressBoxes.forEach((addressBox) => {
            const checkbox = addressBox.querySelector(".checkbox");
            const locationName = addressBox.querySelector(".location__name").textContent;

            if (checkbox.checked) {
                selectedAddress = locationName;
            }
        });

        if (selectedAddress !== "") {
            localStorage.setItem("address",selectedAddress);
            window.location.href = `/src/pages/checkout`;
        } else {
            alert("Please select an address before applying.");
        }
    });
});

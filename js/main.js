document.addEventListener("DOMContentLoaded", () => {
  const flightContainer = document.getElementById("flights");
  if (flightContainer) {
    // Get search params for dynamic flight info
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from") || "Delhi";
    const to = params.get("to") || "Mumbai";
    const date = params.get("date") || "2025-06-25";

    const mockFlights = [
      { name: "IndiGo 6E123", time: "10:00 AM", price: "₹4,999" },
      { name: "Air India AI456", time: "12:30 PM", price: "₹6,799" },
      { name: "SpiceJet SJ789", time: "4:00 PM", price: "₹5,499" },
    ];

    mockFlights.forEach((flight, idx) => {
      const div = document.createElement("div");
      div.className = "flight-card";
      div.innerHTML = `
        <p><strong>${flight.name}</strong></p>
        <p>${from} → ${to}</p>
        <p>Departure: ${flight.time} | Date: ${date}</p>
        <p>Price: ${flight.price}</p>
        <a href="booking.html?flight=${encodeURIComponent(flight.name)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&price=${encodeURIComponent(flight.price)}"><button>Book Now</button></a>
      `;
      flightContainer.appendChild(div);
    });
  }

  // Pre-fill booking details if on booking.html
  if (window.location.pathname.includes("booking.html")) {
    const params = new URLSearchParams(window.location.search);
    const flight = params.get("flight");
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const price = params.get("price");
    const form = document.querySelector("form");
    if (flight && form) {
      const details = document.createElement("div");
      details.style.marginBottom = "1rem";
      details.innerHTML = `<strong>Flight:</strong> ${flight}<br><strong>Route:</strong> ${from} → ${to}<br><strong>Date:</strong> ${date}<br><strong>Price:</strong> ${price}`;
      form.insertBefore(details, form.firstChild);
    }
    // Save booking details to localStorage on submit
    form && form.addEventListener("submit", function(e) {
      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      localStorage.setItem("bookingDetails", JSON.stringify({ flight, from, to, date, price, name, email, phone }));
    });
  }

  // Show booking details on confirmation.html
  if (window.location.pathname.includes("confirmation.html")) {
    const details = JSON.parse(localStorage.getItem("bookingDetails") || '{}');
    if (details && details.flight) {
      const card = document.querySelector(".search-card");
      const info = document.createElement("div");
      info.style.marginTop = "1.5rem";
      info.style.textAlign = "left";
      info.innerHTML = `<h3>Booking Details</h3>
        <p><strong>Flight:</strong> ${details.flight}</p>
        <p><strong>Route:</strong> ${details.from} → ${details.to}</p>
        <p><strong>Date:</strong> ${details.date}</p>
        <p><strong>Passenger:</strong> ${details.name}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Phone:</strong> ${details.phone}</p>
        <p><strong>Price:</strong> ${details.price}</p>`;
      card && card.appendChild(info);
      // Optionally clear booking details
      localStorage.removeItem("bookingDetails");
    }
  }
});

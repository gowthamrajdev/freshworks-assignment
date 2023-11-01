var client;

init();

async function init() {
  window.client = await app.initialized();
  client.events.on("app.activated", () => {
    getCustomerCardTemplate()
  });
}

function getCustomerCardTemplate() {
    fetch("http://localhost:3000/customer-details")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed");
        }
      })
      .then((customerDetails) => {
        const customerCard = `<div>
            ${customerDetails.map(
              (customer) => `<div class="fw-font-family">
                    <div class="fw-card-3 fw-p-20 fw-flex fw-flex-column">
                    <section class="fw-flex">
                        <h4 class="fw-flex-grow fw-type-h4 fw-my-0">${customer.name}</h4>
                        <fw-button onclick="onClickOrder(${customer.id})" color="secondary" class="fw-type-h6"> View Orders </fw-button>
                    </section>
                    <section class="fw-flex fw-flex-column fw-mt-4">
                        <h6 class="fw-type-h6 fw-my-0">${customer.phone}</h6>
                        <p class="fw-type-xs fw-my-0">${customer.addressLineOne}, ${customer.city}, ${customer.state}</p>
                    </section>
                    </div>
                    </div>`
            )}
        </div>`;
        var demo = document.getElementById("customerCard");
        demo.innerHTML = customerCard;
      })
      .catch((error) => {
        console.error(error);
      });
}

function onClickOrder(customerId) {
    console.log('clicked')
    fetch(`http://localhost:3000/order-details?customerId=${customerId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed");
        }
      })
      .then((orderDetails) => {
        console.log('--->', orderDetails)
      })
      .catch((error) => {
        console.error(error);
      });
}

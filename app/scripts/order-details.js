var client;

init();

async function init() {
  window.client = await app.initialized();
  client.events.on("app.activated", () => {
    getCustomerCardTemplate()
  });
}

const AWS_DOMAIN = 'https://ec2-51-20-92-174.eu-north-1.compute.amazonaws.com'

function getCustomerCardTemplate(phoneNumber) {
    const customerDetailsurl = phoneNumber ? `${AWS_DOMAIN}/customer-details?phoneNumber=${phoneNumber}` : `${AWS_DOMAIN}/customer-details`;  
    fetch(customerDetailsurl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed");
        }
      })
      .then((customerDetails) => {
        let customerCard = '';
        if (Object.keys(customerDetails).length === 0) {
            customerCard = `<div
            class="header fw-font-family fw-text-align-center fw-type-h6 fw-py-16 fw-px-16 fw-b-b-1 fw-bg-smoke-25"
          >
            No Records Found
          </div>`;
        } else {
            customerCard = `<div>
            ${customerDetails.map(
              (customer) => `<div class="fw-font-family order-card">
                    <div class="fw-card-3 fw-p-20 fw-flex fw-flex-column">
                    <section class="fw-flex">
                        <h4 class="fw-flex-grow fw-type-h4 fw-my-0">${customer.name}</h4>
                        <fw-button onclick="onClickOrder(${customer.id})" color="secondary" class="fw-type-h6"> View Orders </fw-button>
                    </section>
                    <section class="fw-flex fw-flex-column fw-mt-4">
                        <h6 class="fw-type-h6 fw-my-0">${customer.phone}</h6>
                        <p class="fw-type-xs fw-my-0">${customer.addressLineOne}, ${customer.city}, ${customer.state}</p>
                    </section>
                    <section id=${customer.id}_data class="fw-flex fw-flex-column fw-mt-4">
                    </section>
                    </div>
                    </div>`
            ).join("")}
        </div>`;
        }
        var demo = document.getElementById("customerCard");
        demo.innerHTML = customerCard;
      })
      .catch((error) => {
        console.error(error);
      });
}

// onclick event for view orders
function onClickOrder(customerId) {
    console.log('clicked')
    fetch(`${AWS_DOMAIN}/order-details?customerId=${customerId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API request failed");
        }
      })
      .then((orderDetails) => {
        let ordersCard = '';
        if (Object.keys(orderDetails).length === 0) {
            ordersCard = `<div
            class="header fw-type-h6 fw-py-16 fw-px-16 fw-b-b-1 fw-bg-smoke-25"
          >
            No orders Found
          </div>`;
        } else {
            ordersCard =` <div class="fw-py-16">
            <div class="fw-text-align-right"><fw-button onclick="onClickcloseOrder(${customerId})" size="icon" color="secondary"
            ><fw-icon name="cross" size="10"></fw-icon>
          </fw-button></div>
            ${Object.keys(orderDetails).map(order => `<section class="details fw-bg-smoke-25 order-card-all">
            <div
              class="header fw-type-h6 fw-py-16 fw-px-16 fw-b-b-1 fw-b-solid fw-b-smoke-100"
            >
              Order Number #${order}
            </div>
            ${orderDetails[order].map((orderItem, key) => `<div class="body">
            <div
              class="header fw-type-h6 fw-py-16 fw-px-16 fw-b-b-1 order-item-header"
            >
              Item ${key + 1}
            </div>
            <table class="order-item">
              <tr class="fw-b-0">
                <td class="fw-b-0 fw-type-sm">Product Name</td>
                <td class="fw-b-0 fw-type-h6">${orderItem.productName}</td>
              </tr>
              <tr class="fw-b-0">
                <td class="fw-b-0 fw-type-sm">Quantity</td>
                <a href="#">
                  <td class="fw-b-0 fw-type-h6 fw-color-azure-800">${orderItem.quantity}</td>
                </a>
              </tr>
              <tr class="fw-b-0">
                <td class="fw-b-0 fw-type-sm">Price</td>
                <a href="#">
                  <td class="fw-b-0 fw-type-h6 fw-color-azure-800">${orderItem.price}</td>
                </a>
              </tr>
              <tr class="fw-b-0">
                <td class="fw-b-0 fw-type-sm">Payment Mode</td>
                <td class="fw-b-0 fw-type-h6">${orderItem.paymentType}</td>
              </tr>
              <tr class="fw-b-0">
                <td class="fw-b-0 fw-type-sm">Payment Status</td>
                <td class="fw-b-0 fw-type-h6">${orderItem.paymentStatus}</td>
              </tr>
            </table>
          </div>`).join("")}
          </section>`).join("")}

                          </div>`;
        }
        var ordersDemo = document.getElementById(`${customerId}_data`);
        ordersDemo.innerHTML = ordersCard;
      })
      .catch((error) => {
        console.error(error);
      });
}

// onclick event for mobile number filter
function onClickFilter() {
    const phoneNumber = document.getElementById('phone-input').value;
    if (phoneNumber) {
        getCustomerCardTemplate(phoneNumber);
    } else {
        getCustomerCardTemplate();
    }
} 

function onClickcloseOrder(customerId) {
  const orderCardEle = document.getElementById(`${customerId}_data`);
  orderCardEle.innerHTML = `<section id=${customerId}_data class="fw-flex fw-flex-column fw-mt-4">
  </section>`;
}
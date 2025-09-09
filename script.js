
   function toggleMenu() {
    document.querySelector(".profileiconmenu").classList.toggle("active");
  }
function searchVegetable() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let articles = document.querySelectorAll(".products article");
  let notFoundDiv = document.getElementById("searchnotfound");
  let found = false;

  articles.forEach(article => {
    let name = article.querySelector("h3").innerText.toLowerCase();
    if (name.includes(input)) {
      article.style.display = "block";
      found = true;
    } else {
      article.style.display = "none";
    }
  });

  if (found) {
    notFoundDiv.classList.remove("show");
    setTimeout(() => notFoundDiv.style.display = "none", 500); // waits for fade-out
  } else {
    notFoundDiv.style.display = "block";
    setTimeout(() => notFoundDiv.classList.add("show"), 10); // triggers animation
  }
}

let billItems = []; 
let billItems2 = []; // stores vegetables and kg values
function addToBill(inputId, vegName, amt) {
    let kgValue = document.getElementById(inputId).value;

    if (kgValue.trim() === "" || isNaN(kgValue) || kgValue <= 0) {
        alert("Enter amount in kg");
    } else {
        let quantity = parseFloat(kgValue); // convert to number
        let vegamount = amt * quantity; 
        billItems.push({ name: vegName, kg: quantity, a: vegamount });
        billItems2.push({ name: vegName, kg: quantity, a: vegamount }); 
        alert(vegName + " (" + quantity + " kg) " + "Rs." + vegamount + " added to bill");
        localStorage.setItem("lastBill", JSON.stringify(billItems2));
    }
    
}


function viewBill() {
    if (billItems.length === 0) {
        alert("Your bill is empty!");
        return;
    }

    // Calculate total
    let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

    // Create popup
    let billWindow = window.open("", "BillWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

    billWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .bill-container {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 350px;
                    margin: auto;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #ecf0f1;
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                }
                .veg-name { font-weight: bold; color: #34495e; }
                .kg-value { color: #27ae60; }
                .veg-amt { color: #c0392b; }
                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .edit-btn { background: #f39c12; color: white; }
                .clear-btn { background: #e74c3c; color: white; }
                .order-btn {background: #39ff49ff; color: white;}
                .total {
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                    color: #2c3e50;
                }
         
                @media (max-width: 768px) {
                      html, body {
                               
                               height: 100%;   
                              overflow-y: hidden;     /* Scroll if too tall */
                              padding: 15px;
                              max-width: 100%;
                        }
                        .bill-container {
                        overflow-y: hidden;
                        height: 80%;
                        width: auto;
                        }
                        .bill-container button {
                         width: auto;            /* full width buttons in mobile */
                          margin: 5px 0;
                             }
}
            </style>
        </head>
        <body>
            <div class="bill-container">
                <h2>Your Bill</h2>
                <ul id="bill-list">
                    ${billItems.map((item, index) => 
                        `<li>
                            <span class="veg-name">${item.name}</span> 
                            <span class="kg-value">${item.kg} kg</span>
                            <span class="veg-amt">Rs.${item.a}</span>
                        </li>`
                    ).join('')}
                </ul>
                <div class="total">Total: Rs.${totalAmount}</div>
                <div class="buttons">
                    <button class="edit-btn" onclick="window.opener.editBill();window.close();">Edit Bill</button>
                    <button class="clear-btn" onclick="window.opener.clearBill(); window.close();">Clear Bill</button>
                    <button class="order-btn" onclick="window.opener.orderBill();window.close();">Order Bill</button>
                </div>
            </div>
        </body>
        </html>
    `);
}



function vieworderBILL() {
     let savedbill = localStorage.getItem("lastBill"); 

    if (!savedbill) {
        alert("Your bill is empty!");
        return;
    }

    let billItems = JSON.parse(savedbill); 

    // Calculate total
    let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

    // Create popup
    let orderWindow = window.open("", "orderWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

    orderWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .bill-container {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 350px;
                    margin: auto;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #ecf0f1;
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                }
                .veg-name { font-weight: bold; color: #34495e; }
                .kg-value { color: #27ae60; }
                .veg-amt { color: #c0392b; }
                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .total {
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                    color: #2c3e50;
                }
             
                @media (max-width: 768px) {
                      html, body {
                               
                               height: 100%;   
                              overflow-y: hidden;     /* Scroll if too tall */
                              padding: 15px;
                              max-width: 100%;
                        }
                        .bill-container {
                        overflow-y: hidden;
                        height: 80%;
                        width: auto;
                        }
                        .bill-container button {
                         width: auto;            /* full width buttons in mobile */
                          margin: 5px 0;
                             }
}
}

            </style>
        </head>
        <body>
            <div class="bill-container">
                <h2>Your Bill</h2>
                <ul id="bill-list">
                    ${billItems.map((item, index) => 
                        `<li>
                            <span class="veg-name">${item.name}</span> 
                            <span class="kg-value">${item.kg} kg</span>
                            <span class="veg-amt">Rs.${item.a}</span>
                        </li>`
                    ).join('')}
                </ul>
                <div class="total">Total: Rs.${totalAmount}</div>
               
            </div>
        </body>
        </html>
    `);
}

function showBillPopup(billItems, time) {
  // Calculate total
  let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

  let orderWindow = window.open("", "orderWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

  orderWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Bill</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f9f9f9; }
        h2 { text-align: center; color: #2c3e50; }
        .bill-container { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 350px; margin: auto; }
        ul { list-style: none; padding: 0; }
        li { background: #ecf0f1; margin: 8px 0; padding: 10px; border-radius: 5px; display: flex; justify-content: space-between; }
        .veg-name { font-weight: bold; color: #34495e; }
        .kg-value { color: #27ae60; }
        .veg-amt { color: #c0392b; }
        .total { margin-top: 15px; font-size: 18px; font-weight: bold; text-align: right; color: #2c3e50; }
      </style>
    </head>
    <body>
      <div class="bill-container">
        <h2>Your Bill</h2>
        <p><strong>Placed On:</strong> ${time}</p>
        <ul id="bill-list">
          ${billItems.map(item => `
            <li>
              <span class="veg-name">${item.name}</span>
              <span class="kg-value">${item.kg} kg</span>
              <span class="veg-amt">Rs.${item.a}</span>
            </li>
          `).join('')}
        </ul>
        <div class="total">Total: Rs.${totalAmount}</div>
      </div>
    </body>
    </html>
  `);
}

// Function to clear bill
function clearBill() {
    billItems = [];
    
    alert("Your bill is deleted! Order for a new Bill");
    
}

// Function to edit bill (you can extend this to re-open bill input fields)
function editBill() {
    alert("You can only clear bill and then order again.");

    

}

function orderBill() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please login first!");
    document.getElementById("loginPopup").style.display = "block";
    document.getElementById("loginFrame").src = "login.html";  
    return;
  }

  if (!billItems || billItems.length === 0) {
    alert("⚠️ Your cart is empty!");
    return;
  }

  let now = new Date();
  let dateTime = now.toLocaleString();

  const customerName = localStorage.getItem("customerName");
  const customerMobile = localStorage.getItem("customerMobile");
  const customerAddress = localStorage.getItem("customerAddress");

  if (!customerName || !customerMobile || !customerAddress) {
    alert("⚠️ Please update your profile details before ordering!");
    return;
  }

  // ✅ Build items string and calculate total
// ✅ Save full details of each item
const itemsArr = billItems.map(item => {
  const quantity = item.kg;
  const price = item.a; // fallback to 0 if missing

  return {
    name: item.name || "Unknown",
    qty: quantity,
    price: price
  };
});
  const totalAmount = billItems
    .reduce((sum, item) => {
      const quantity = item.kg;
      return sum + item.a ;
    }, 0);

  // ✅ Build order object
  const orderData = {
  uid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : "guest",
  customerName: customerName || "Unknown",
  customerMobile: customerMobile || "Unknown",
  customerAddress: customerAddress || "Unknown",
  items: itemsArr,
  totalAmount,
  status: "pending",
  time: dateTime,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
};

  // ✅ Save to Firestore
  db.collection("orders").add(orderData)
    .then(() => {
      alert(`✅ Thank you ${customerName}! Your order is confirmed at ${dateTime}`);

     const userKey = `orders_${customerMobile}`; // or use uid: `orders_${firebase.auth().currentUser.uid}`

let orders = JSON.parse(localStorage.getItem(userKey)) || [];
orders.push(orderData);
localStorage.setItem(userKey, JSON.stringify(orders));
      // Clear cart after placing order
      billItems = [];
      localStorage.removeItem("billItems");

      window.parent.location.href = "myorders.html";
    })
    .catch(error => {
      console.error("❌ Error saving order: ", error);
      alert("⚠️ Could not confirm order. Try again.");
    });
}



// Show all orders
function vieworder() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let orderContainer = document.getElementById("ordersContainer");

  if (orders.length === 0) {
    orderContainer.innerHTML = "<h2>No Order Placed</h2>";
  } else {
    orderContainer.innerHTML = ""; // Clear old data

    orders.forEach((order, index) => {
      let orderCard = document.createElement("div");
      orderCard.classList.add("order-card");
      orderCard.innerHTML = `
        <h2>Order ${index + 1}</h2>
        <p>Placed On: ${order.time}</p>
        <button onclick="vieworderbill(${index})">View Bill</button>
      `;
      orderContainer.appendChild(orderCard);
    });
  }
}

// View bill of a specific order
function vieworderbill(index) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let order = orders[index];

  alert("Showing bill for: " + order.time);
  // Later you can replace this with actual bill details
}

function viewORDERBILL(billItems) {
  if (!billItems || billItems.length === 0) {
    alert("Your bill is empty!");
    return;
  }

  // Calculate total
  let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

  let billHTML = `
    <h2>Your Bill</h2>
    <div class="bill-container">
      <ul>
        ${billItems.map(item => `
          <li>
            <span class="veg-name">${item.name}</span>
            <span class="kg-value">${item.kg} kg</span>
            <span class="veg-amt">Rs.${item.a}</span>
          </li>
        `).join('')}
      </ul>
      <div class="total">Total: Rs.${totalAmount}</div>
    </div>
  `;

  document.getElementById("billContainer").innerHTML = billHTML;
  document.getElementById("billPopup").style.display = "block";
}


function closeBillPopup() {
    document.getElementById("billPopup").style.display = "none";
}


// login ----------------------------------------------------------
function openLogin() {
   
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("loginFrame").src = "login.html";  // load login page
}

function closeLogin() {
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("loginFrame").src = ""; // clear frame
}


// Call this function after successful login
function setLogin() {
  localStorage.setItem("isLoggedIn", "true");
  showLoginStatus();
}

// Call this function when logging out
function logout() {
  localStorage.removeItem("isLoggedIn");
  showLoginStatus();
  window.location.href="index.html";
}


// Function to update nav UI
function showLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginNav = document.getElementById("loginNav");
  const loginSuccessNav = document.getElementById("loginSuccessNav");
  const loginSuccessicon = document.getElementById("loginSuccessicon");
  const loginicon = document.getElementById("loginicon");
  const profileMenu = document.getElementById("profileMenu");
  const loginham = document.getElementById("loginham");
  const loginsuccessham = document.getElementById("loginsuccessham");

  if (isLoggedIn) {
    loginNav.style.display = "none";
    loginSuccessNav.style.display = "inline-block";
    loginSuccessicon.style.display="flex";
    document.getElementById("profileMenu").style.display = isLoggedIn ? "inline-block" : "none";
    loginsuccessham.style.display="block";
  } else {
    loginNav.style.display = "inline-block";
    loginSuccessNav.style.display = "none";
    loginicon.style.display="flex";
     document.getElementById("profileMenu").style.display = isLoggedIn ? "inline-block" : "none";
     loginham.style.display="block";
  }
}

function checkloginprofile() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn) {
        window.location.href="profile.html";
    }
    else {
        alert("Please login first!");
    }
}
// user icon functions

// Toggle dropdown when clicking user icon
document.addEventListener("DOMContentLoaded", () => {
  const profileMenu = document.querySelector(".profile-menu");
  const profileIcon = document.querySelector(".profile-icon");

  profileIcon.addEventListener("click", () => {
    profileMenu.classList.toggle("show");
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) {
      profileMenu.classList.remove("show");
    }
  });
});

// Simulated login function
function loginSuccess() {
  document.getElementById("loginNav").style.display = "none";
  document.getElementById("profileMenu").style.display = "block";
  localStorage.setItem("isLoggedIn", "true");
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  document.getElementById("profileMenu").style.display = "none";
  document.getElementById("loginNav").style.display = "block";
  window.location.href = "index.html";
}

// On page load, check login state
window.onload = function () {
  if (localStorage.getItem("isLoggedIn")) {
    document.getElementById("loginNav").style.display = "none";
    document.getElementById("profileMenu").style.display = "block";
  }
};



// Run on every page load
document.addEventListener("DOMContentLoaded", showLoginStatus);

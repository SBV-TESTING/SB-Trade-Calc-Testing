//Copyright © 2025 SB-VALUES. All rights reserved.
//This code is not open source. Do not copy or reuse without permission.
const yourOfferList = document.getElementById('your-offer-list');
const yourValue = document.getElementById('your-value');
const theirOfferList = document.getElementById('their-offer-list');
const theirValue = document.getElementById('their-value');
const buttons = Array.from(document.querySelectorAll('.add'));
const clear = document.getElementById('clear');
const wfl = document.getElementById('wfl');
const searchO = document.getElementById('searchO')
const search = document.getElementById('search');
let numYours = 0;
let numTheirs = 0;
let value = 0;
let obj = {};
let objO = {};
let clicked;
const setQuantityBtn = document.getElementById("set-quantity-btn");
const quantityInput = document.getElementById("quantity-input");
const quantityError = document.getElementById("quantity-error");
const quantityDia = document.getElementById("quantity-dia");
const quantityDiaClose = document.getElementById("quantity-dia-close")
const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));
const removeBtnsO = Array.from(document.querySelectorAll('.remove-btnO'));
buttons.forEach(button => {
    if(button.dataset.type.endsWith("O")) {
    button.addEventListener('click', () => {
        const checkWflO = () => {
            if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else if(numYours/1000 < (numTheirs/1000)-1000) {
                wfl.textContent = "LARGE WIN";
                wfl.style.color = "lime";
            } else if(numYours < numTheirs && (numTheirs-numYours)/1000 <= 30) {
                wfl.textContent = "SMALL WIN";
                wfl.style.color = "green";
            } else if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "green";
            } else if((numYours/1000)-1000 > numTheirs/1000) {
                wfl.textContent = "LARGE LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs && (numYours-numTheirs)/1000 <= 30) {
                wfl.textContent = "SMALL LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs){
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        if(objO[button.dataset.type]) {
        objO[button.dataset.type]++;
        const amount = document.getElementById(`${button.dataset.type}amount`);
        amount.textContent = objO[button.dataset.type];
        } else {
        objO[button.dataset.type] = 1;
       theirOfferList.innerHTML += `<li data-type="${button.dataset.type}" data-value="${button.dataset.num}">${button.dataset.type.slice(0, -1)} x<p class="${button.dataset.type}amount" style="display: inline;">${objO[button.dataset.type]}</p>- ${button.dataset.num}<br><button class="remove-btnO"><i style="font-size: 11px" class="fa fa-trash"></i> Remove</button><button class="quantity-btnO quantity-dia-btn"><i style="font-size: 11px" class="fa fa-hashtag"></i> Quantity</button></li>`;
        const quantityDiaBtns = Array.from(document.getElementsByClassName("quantity-dia-btn"));
        quantityDiaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            diaDisplayer(quantityDia);
            clicked = btn;
        });
        });
        setQuantityBtn.addEventListener("click", () => {
            const li = clicked.closest("li");
            const quantity = li.querySelector(`.${button.dataset.type}amount`);
            let itemval = Number(li.dataset.value);
            let newQuantity = Number(quantity.value);
            let oldQuantity = Number(objO[button.dataset.type]);
            quantity.textContent = quantityInput.value;
            numTheirs = numTheirs + (newQuantity-oldQuantity)*(itemval*1000)-itemval;
            theirValue.textContent = `${numTheirs/1000}`;
            diaUnDisplayer(quantityDia);
            quantityInput.value = "";
            objO[button.dataset.type] = newQuantity;
        });
        quantityDiaClose.addEventListener("click", () => {
            quantityDia.style.opacity = "0";
            quantityDia.style.transform = "scale(0.4)";
            setTimeout(() => {quantityDia.close()}, 100);
            body.style.overflow = "scroll";
            quantityInput.value = "";
        });
        }
        document.querySelectorAll('.remove-btnO').forEach(remove => {
            const removeFuncO = () => {
                if(objO[remove.parentElement.dataset.type] > 1) {
                objO[remove.parentElement.dataset.type]--;
                const amount = document.getElementById(`${remove.parentElement.dataset.type}amount`);
                amount.textContent = objO[remove.parentElement.dataset.type];
                } else {
                delete objO[remove.parentElement.dataset.type];
                remove.parentElement.remove();
                }
                numTheirs -= Number(remove.parentElement.dataset.value)*1000;
                theirValue.textContent = `${numTheirs/1000}`;
                checkWflO();
            }
            remove.onclick = removeFuncO;
        })
        numTheirs += Number(button.dataset.num)*1000;
        theirValue.textContent = `${numTheirs/1000}`;
        checkWflO();
    });
} else {
    button.addEventListener('click', () => {
        const checkWfl = () => {
            if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else if(numYours/1000 < (numTheirs/1000)-1000) {
                wfl.textContent = "LARGE WIN";
                wfl.style.color = "lime";
            } else if(numYours < numTheirs && (numTheirs-numYours)/1000 <= 30) {
                wfl.textContent = "SMALL WIN";
                wfl.style.color = "green";
            } else if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "green";
            } else if((numYours/1000)-1000 > numTheirs/1000) {
                wfl.textContent = "LARGE LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs && (numYours-numTheirs)/1000 <= 30) {
                wfl.textContent = "SMALL LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs){
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        if(obj[button.dataset.type]) {
        obj[button.dataset.type]++;
        const amount = document.getElementById(`${button.dataset.type}amount`);
        amount.textContent = obj[button.dataset.type];
        } else {
        obj[button.dataset.type] = 1;
        yourOfferList.innerHTML += `<li data-type="${button.dataset.type}" data-value="${button.dataset.num}">${button.dataset.type} x<p id="${button.dataset.type}amount" style="display: inline;">${obj[button.dataset.type]}</p>- ${button.dataset.num}<br><button class="remove-btn">Remove</button></li>`;
        }
        document.querySelectorAll('.remove-btn').forEach(remove => {
            const removeFunc = () => {
                if(obj[remove.parentElement.dataset.type] > 1) {
                    obj[remove.parentElement.dataset.type]--;
                    const amount = document.getElementById(`${remove.parentElement.dataset.type}amount`);
                    amount.textContent = obj[remove.parentElement.dataset.type];
                } else {
                delete obj[remove.parentElement.dataset.type];
                remove.parentElement.remove();
                }
                numYours -= Number(remove.parentElement.dataset.value)*1000;
                yourValue.textContent = `${numYours/1000}`;
                checkWfl();
            }
            remove.onclick = removeFunc;
        });
        numYours += Number(button.dataset.num)*1000;
        yourValue.textContent = `${numYours/1000}`;
        checkWfl();
    });
}
});
clear.addEventListener('click', () => {
    amount = 0;
    obj = {};
    objO = {};
    theirOfferList.innerHTML = "";
    yourOfferList.innerHTML = "";
    numYours = 0;
    numTheirs = 0;
    yourValue.textContent = `${numYours}`;
    theirValue.textContent = `${numTheirs}`;
    wfl.textContent = "";
    search.value = "";
    searchO.value = "";
    searchFunc();
    searchFuncO();
});
const searchFunc = () => {
    buttons.forEach(button => {
    let regex = new RegExp(search.value.replace(/\s/g, ""), "i");
    if(regex.test(button.dataset.type.replace(/\s/g, ""))) {
        button.parentElement.style.display = "flex";
    } else {
        button.parentElement.style.display = "none";
    }
});
}
const searchFuncO = () => {
    buttons.forEach(button => {
    let regex = new RegExp(searchO.value.replace(/\s/g, ""), "i");
    if(regex.test(button.dataset.type.replace(/\s/g, ""))) {
        button.parentElement.style.display = "flex";
    } else {
        button.parentElement.style.display = "none";
    }
});
}
searchO.addEventListener('input', searchFuncO);
search.addEventListener('input', searchFunc);
search.addEventListener('click', () => {
    search.value = ""
    searchFunc();
});
searchO.addEventListener('click', () => {
    searchO.value = ""
    searchFuncO();
});
const body = document.getElementById('body');
const dia = document.getElementById('dia');
const diaBtn = document.getElementById('dia-btn');
const closeDia = document.getElementById('close-dia');
const diaBtnFoot = document.getElementById("dia-btn-foot");
const giveawayBtn = document.getElementById("giveaways");
const giveawayDia = document.getElementById("giveaway-dia");
const giveawayDiaFoot = document.getElementById("giveaways-foot");
const giveawayCloseDia = document.getElementById("giveaway-close-dia");
const diaDisplayer = (dialog) => {
    dialog.showModal();
    body.style.overflow = "hidden";
    dialog.style.opacity = "1";
    dialog.style.transform = "scale(1)";
}
const diaUnDisplayer = (dialog) => {
    dialog.style.opacity = "0";
    dialog.style.transform = "scale(0.4)";
    setTimeout(() => {dialog.close()}, 100);
    body.style.overflow = "scroll";
}
giveawayBtn.addEventListener("click", () => diaDisplayer(giveawayDia));
giveawayDiaFoot.addEventListener("click", () => diaDisplayer(giveawayDia));
giveawayCloseDia.addEventListener("click", () => diaUnDisplayer(giveawayDia));
diaBtn.addEventListener("click", () => diaDisplayer(dia));
diaBtnFoot.addEventListener("click", () => diaDisplayer(dia));
closeDia.addEventListener("click", () => diaUnDisplayer(dia));
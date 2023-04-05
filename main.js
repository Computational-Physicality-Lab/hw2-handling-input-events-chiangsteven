// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    localStorage.removeItem("side");
    localStorage.removeItem("index");
    var list_div = document.getElementById("shirts-list");
    for (let idx in shirts) {
        const { firstColor, numColors } = getFirstAvailableColorAndNum(idx);
        const name = getShirtName(idx);
        const { front_image } = getFirstShirtImages(idx, firstColor);
        var item = createShirtItem(idx, name, front_image, numColors);
        list_div.appendChild(item);
    }
};

var color_detail = "";

let initDetails = () => {
    let idx = localStorage.getItem("index");
    setSimpleInfo(idx);
    let side_detail = localStorage.getItem("side");
    const { firstColor } = getFirstAvailableColorAndNum(idx);
    const { front_image, back_image } = getFirstShirtImages(idx, firstColor);
    color_detail = firstColor;

    let pic = document.getElementById("shirt-pic");
    if (side_detail === "back")
        pic.setAttribute("src", back_image);
    else
        pic.setAttribute("src", front_image);

    let color = document.getElementById("shirt-color");
    let colors = getAllColors(idx);
    colors.forEach(option => {
        let btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = option;
        btn.className = "color-btn";
        if (option === "white" || option === "yellow")
            btn.className += " light-color";
        else
            btn.className += " oth-color";
        btn.style.backgroundColor = option;
        btn.onclick = () => { color_detail = option; setSelectedImage(idx); };
        color.appendChild(btn);
    });
};

let clickFront = () => {
    let idx = localStorage.getItem("index");
    localStorage.setItem("side", "front");
    setSelectedImage(idx);
}

let clickBack = () => {
    let idx = localStorage.getItem("index");
    localStorage.setItem("side", "back");
    setSelectedImage(idx);
}

let clickClose = () => {
    let q = document.getElementById("quick");
    q.style.display = "none";
}

let clickQuickView = (index) => {
    localStorage.setItem("index", index);
    document.getElementById("quick").style.display = "flex";
    setSimpleInfo(index);

    const { firstColor } = getFirstAvailableColorAndNum(index);
    const { front_image, back_image } = getFirstShirtImages(index, firstColor);
    color_detail = firstColor;


    let f_pic = document.getElementById("qf-shirt-pic");
    f_pic.setAttribute("src", front_image);
    let b_pic = document.getElementById("qb-shirt-pic");
    b_pic.setAttribute("src", back_image);

}

function createShirtItem(idx, name, pic, num) {
    var item = document.createElement("div");
    let img = document.createElement("img");
    let pic_a = document.createElement("a");
    pic_a.setAttribute("href", "./details.html");
    pic_a.onclick = () => { localStorage.setItem("index", idx); localStorage.setItem("side", "front") };
    img.src = pic;
    pic_a.appendChild(img);
    item.appendChild(pic_a);
    let p = document.createElement("p");
    p.textContent = name;
    item.appendChild(p);
    let num_p = document.createElement("p");
    num_p.textContent = "Available in " + num + " colors";
    num_p.setAttribute("class", "ava-color");
    item.appendChild(num_p);
    let btn1 = document.createElement("a");
    let btn2 = document.createElement("a");
    btn1.href = "./products.html#quick";
    btn2.href = "./details.html";
    btn1.className = "side-btn";
    btn2.className = "side-btn";
    btn1.textContent = "Quick view";
    btn2.textContent = "See more";
    btn1.onclick = () => { clickQuickView(idx); };
    btn2.onclick = () => { localStorage.setItem("index", idx); localStorage.setItem("side", "front") };
    item.appendChild(btn1);
    item.appendChild(btn2);
    item.setAttribute("class", "shirt-item");
    return item;
}

function getFirstAvailableColorAndNum(idx) {
    let firstColor = undefined;
    let numColors = 0;
    for (let color in shirts[idx].colors) {
        numColors++;
        if (firstColor === undefined || shirts[idx].colors[firstColor].front === undefined)
            firstColor = color;
    }
    return { "firstColor": firstColor, "numColors": numColors };
}

function getShirtName(idx) {
    let name = shirts[idx].name;
    if (name === undefined)
        name = "Unamed shirt";
    return name;
}

function getFirstShirtImages(idx, firstColor) {
    let front_image = undefined;
    let back_image = undefined;
    if (firstColor === undefined || shirts[idx].colors === undefined || shirts[idx].colors[firstColor].front === undefined)
        front_image = "./shirt_images/not-found.png";
    else
        front_image = shirts[idx].colors[firstColor].front;
    if (firstColor === undefined || shirts[idx].colors === undefined || shirts[idx].colors[firstColor].back === undefined)
        back_image = "./shirt_images/not-found.png";
    else
        back_image = shirts[idx].colors[firstColor].back;
    return { "front_image": front_image, "back_image": back_image };
}

function getPrice(idx) {
    let price = shirts[idx].price;
    if (price === undefined)
        price = "No price info";
    return price;
}

function getDescription(idx) {
    let description = shirts[idx].description;
    if (description === undefined)
        description = "No description";
    return description;
}

function getAllColors(idx) {
    let colors = [];
    for (let color in shirts[idx].colors) {
        colors.push(color);
    }
    return colors;
}

function setSelectedImage(idx) {
    let side_detail = localStorage.getItem("side");
    let pic = document.getElementById("shirt-pic");
    let image;
    if (shirts[idx].colors === undefined)
        return;
    if (shirts[idx].colors[color_detail][side_detail] === undefined)
        image = "./shirt_images/not-found.png";
    else
        image = shirts[idx].colors[color_detail][side_detail];
    pic.setAttribute("src", image);
}

function setSimpleInfo(idx) {
    let name = document.getElementById("shirt-name");
    name.textContent = getShirtName(idx);

    let price = document.getElementById("shirt-price");
    price.textContent = getPrice(idx);

    let description = document.getElementById("shirt-description");
    description.textContent = getDescription(idx);
}
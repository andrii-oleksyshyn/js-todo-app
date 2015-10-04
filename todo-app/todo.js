function setItem() {
    // Value that we pass into the input field
    input = document.getElementById("item-input").value;
    if (!input.length) {
        alert("You need to add at least 1 symbol!");
        return false;
    }

    // Div wrapper that is being appended to the list
    var itemDiv = document.createElement("div");
    itemDiv.className = "panel panel-default";
    // Div that contains icon, item text and remove button
    var itemBodyDiv = document.createElement("div");
    itemBodyDiv.className = "panel-body";
    // Icon
    var iconSpan = document.createElement("span");
    iconSpan.className = "glyphicon glyphicon-menu-right";
    // Item text
    var itemSpan = document.createElement("span");
    itemSpan.className = "item-text down-20";
    // Remove button
    var removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger pull-right";
    removeBtn.innerHTML = "Remove";
    removeBtn.onclick = function() {
        var parent = this.parentNode.parentNode;
        parent.parentNode.removeChild(parent);
    };

    var itemValue = document.createTextNode(input);

    itemSpan.appendChild(itemValue);
    itemBodyDiv.appendChild(iconSpan);
    itemBodyDiv.appendChild(itemSpan);
    itemBodyDiv.appendChild(removeBtn);
    itemDiv.appendChild(itemBodyDiv);

    var itemGroup = document.getElementById("item-group");
    itemGroup.insertBefore(itemDiv, itemGroup.childNodes[0]);
    // Resetting input after item is created
    document.getElementById("item-input").value = "";
}
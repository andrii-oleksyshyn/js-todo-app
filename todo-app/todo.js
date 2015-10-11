var Todo = (function() {
    var INPUT = document.getElementById("item-input");
    var ERROR = document.getElementById("error-message");

    function setValue() {
        var inputValue = INPUT.value;

        if (!inputValue.length) {
            INPUT.parentNode.parentNode.classList.add("has-error");
            ERROR.style.display = "block";
            return false;
        }

        if (INPUT.parentNode.parentNode.classList.contains("has-error")) {
            INPUT.parentNode.parentNode.classList.remove("has-error");
            ERROR.style.display = "none";
        };

        var itemValue = document.createTextNode(inputValue);

        return itemValue;
    }

    function setItem() {
        var itemValue = setValue();

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
        removeBtn.addEventListener("click", removeItem(removeBtn));

        itemSpan.appendChild(itemValue);
        itemBodyDiv.appendChild(iconSpan);
        itemBodyDiv.appendChild(itemSpan);
        itemBodyDiv.appendChild(removeBtn);
        itemDiv.appendChild(itemBodyDiv);

        return itemDiv;
    }

    function removeItem(self) {
        return function() {
            var parent = self.parentNode.parentNode;
            parent.parentNode.removeChild(parent);
        }
    }
            
    return {
        createItem: function() {
            if (!setValue()) {
                return false;
            }

            var itemDiv = setItem();
            var itemGroup = document.getElementById("item-group");
            itemGroup.insertBefore(itemDiv, itemGroup.childNodes[0]);
            
            // Resetting input after item is created
            INPUT.value = "";
        }
    }
}());
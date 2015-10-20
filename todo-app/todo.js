/* Todo Module */
var Todo = (function() {
    var input, add, error, root;

    /* Creates HTML for the component */
    function createHTML(rootEl) {
        root = document.getElementById(rootEl);
        root.innerHTML =    '<div class="form-group row down-20">' + 
                                '<div class="col-sm-5 col-sm-offset-3 down-20">' + 
                                    '<input type="text" id="item-input" class="form-control input" placeholder="Enter some stuff">' + 
                                '</div>' + 
                                '<div class="col-sm-2">' + 
                                    '<button id="add-item" class="btn btn-success btn-block add">Add item!</button>' + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="row error" id="error-message">' + 
                                '<div class="col-sm-5 col-sm-offset-4 down-20 alert alert-danger">' + 
                                    'Please enter at least 1 symbol!' + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="row">' + 
                                '<div class="col-sm-7 col-sm-offset-3 item-group">' + 
                                    '<!-- All items appear here -->' + 
                                '</div>' + 
                            '</div>';
    }

    /* Initialize variables for current root element */
    function initVars() {
        input = root.getElementsByClassName("input")[0];
        add = root.getElementsByClassName("add")[0];
        error = root.getElementsByClassName("error")[0];
    }

    /* Attach event listener for "Add Item" button */
    function attachAddButtonListener() {
        add.addEventListener("click", addItem(input, error, root));
    }

    /* Main function, adds new created items to the todo list */
    function addItem(input, error, root) {
        return function() {
            /* If validation fails, the function doesn't add anything */
            if (!validateValue(input, error)) {
                return false;
            }

            var itemDiv = createItem(input, root);
            var itemGroup = root.getElementsByClassName("item-group")[0];
            itemGroup.insertBefore(itemDiv, itemGroup.childNodes[0]);
            
            /* Resetting input after item is created */
            input.value = "";
        };
    }

    /* Validates entered value and shows/hides error message */
    function validateValue(input, error) {
        if (!input.value.length) {
            input.parentNode.parentNode.classList.add("has-error");
            error.style.display = "block";

            return false;
        }

        if (input.parentNode.parentNode.classList.contains("has-error")) {
            input.parentNode.parentNode.classList.remove("has-error");
            error.style.display = "none";
        }

        return true;
    }

    function createItem(input, root) {
        var removeBtn;
        var itemValue = input.value;

        /* Div wrapper that is being appended to the list */
        var itemDiv = document.createElement("div");
        itemDiv.className = "panel panel-default";
        itemDiv.innerHTML = '<div class="panel-body">' + 
                                '<span class="glyphicon glyphicon-menu-right"></span>' + 
                                '<span class="item-text down-20">' + itemValue + '</span>' + 
                                '<button class="btn btn-danger pull-right">Remove</button>' + 
                            '</div>';
        /* Added setTimeout function because innerHTML works quite slowly :\ */
        setTimeout(function() {
            removeBtn = root.getElementsByClassName('btn-danger')[0];
            removeBtn.addEventListener("click", removeItem(removeBtn));
        }, 10);
        
        return itemDiv;
    }

    /* Removes item from the list */
    function removeItem(self) {
        return function() {
            var parent = self.parentNode.parentNode;
            parent.parentNode.removeChild(parent);
        };
    }
            
    return {
        /*Creates the component on the page inside the root element
        passed in the function as an argument*/
        create: function(rootEl) {
            createHTML(rootEl);
            initVars();
            attachAddButtonListener();
        }
    };
}());
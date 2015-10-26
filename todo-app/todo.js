/* Todo Module */
var Todo = (function() {
    var form, input, add, error, root;

    // CSS variables
    var errorClass = "has-error";
    var btnDanger = ".btn-danger";
    var iGroup = ".item-group";

    /* Creates HTML for the component */
    function createHTML(rootEl) {
        root = $(rootEl)
            .html(   '<div class="form-group row down-20">' + 
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
                        '</div>'
        );
    }

    /* Initialize variables for current root element */
    function initVars() {
        form = $(root.find(".form-group")[0]);
        input = $(root.find(".input")[0]);
        add = $(root.find(".add")[0]);
        error = $(root.find(".error")[0]);
    }

    /* Attach event listener for "Add Item" button */
    function attachAddButtonListener() {
        add.on("click", addItem(form, input, error, root));
    }

    /* Main function, adds new created items to the todo list */
    function addItem(form, input, error, root) {
        return function() {
            /* If validation fails, the function doesn't add anything */
            if (!validateValue(form, input, error)) {
                return false;
            }

            var itemDiv = createItem(input, root);
            var itemGroup = $(root.find(iGroup)[0])
                .prepend(itemDiv);
            
            /* Resetting input after item is created */
            input.val("");
        };
    }

    /* Validates entered value and shows/hides error message */
    function validateValue(form, input, error) {
        if (!input.val()) {
            form.addClass(errorClass);
            error.fadeIn(600);

            return false;
        }

        if (form.hasClass(errorClass)) {
            form.removeClass(errorClass);
            error.fadeOut(400);
        }

        return true;
    }

    function createItem(input, root) {
        var removeBtn;
        var itemValue = input.val();

        /* Div wrapper that is being appended to the list */
        var itemDiv = $($("<div>")[0])
            .addClass("panel panel-default")
            .html(  '<div class="panel-body">' + 
                        '<span class="glyphicon glyphicon-menu-right"></span>' + 
                        '<span class="item-text down-20">' + itemValue + '</span>' + 
                        '<button class="btn btn-danger pull-right">Remove</button>' + 
                    '</div>');
        /* Added setTimeout function because .html method works quite slowly :\ */
        setTimeout(function() {
            removeBtn = root.find(btnDanger)[0];
            $(removeBtn).on("click", removeItem(removeBtn));
        }, 10);
        
        return itemDiv;
    }

    /* Removes item from the list */
    function removeItem(self) {
        return function() {
            var parent = $(self).parents()[1];
            parent.remove(parent);
        };
    }

    /*Public API*/
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
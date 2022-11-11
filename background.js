function addDeleteFunctionality(delBtn) {
    delBtn.addEventListener("click", async() => {
        await deleteItem(delBtn);
    });
}

function addCopyFunctionality(itemValueTxt) {
    itemValueTxt.addEventListener("click", function() {
        navigator.clipboard.writeText(this.value);
    });
}

// function show_test(data) {
//     document.getElementById("test_data").value = JSON.stringify(data);
// }


const displayData = async () => {
    const existingData= await DataService.getData();
    // show_test(existingData);

    var ulEle = document.getElementById("items_list");
    
    // construct document from loaded values
    existingData.forEach(cbItem => {
        var li = document.createElement("li");
        li.setAttribute("id", cbItem.item_id)
    
        var newItemName = document.createElement("LABEL");
        newItemName.innerHTML = cbItem.item_name + ":  ";
        
        var newItemValue = document.createElement("INPUT");
        newItemValue.setAttribute("readonly", "true")
        // newItemValue.setAttribute("onclick", "copyToClipboard(this.value)")
        newItemValue.value = cbItem.item_value;
    
        var newDelBtn = document.createElement("BUTTON")
        // newDelBtn.setAttribute("onclick", "deleteItem(this)");
        newDelBtn.innerText = "Delete";
    
        li.appendChild(newItemName);
        li.appendChild(newItemValue);
        li.appendChild(newDelBtn);
    
        ulEle.appendChild(li);
    
        addDeleteFunctionality(newDelBtn);
        addCopyFunctionality(newItemValue);
    });
    // end constructing document from loaded value
}

const addItem = async () => {
    // load values
    var inputEle = document.getElementById("add_items_div");
    var itemName = inputEle.querySelector("#item_name").value;
    var itemValue = inputEle.querySelector("#item_value").value;
    
    await DataService.addData(Date.now(), itemName, itemValue);
    location.reload();
}

const deleteItem = async (delBtn) => {
    var item = delBtn.parentElement;
    var ulEle = document.getElementById("items_list");
    item_id = item.getAttribute("id")
    await DataService.deleteData(item_id);
    ulEle.removeChild(item);
    location.reload();
}

document.addEventListener('DOMContentLoaded', async () => {

    // add functionality to add items
    document.getElementById("add_item_button").addEventListener("click", addItem);

    // show data
    await displayData();

});

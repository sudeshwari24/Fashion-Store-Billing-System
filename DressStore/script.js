class Dress{
    constructor(customer,dress,size,qty,price){
        this.customer=customer;
        this.dress=dress;
        this.size=size;
        this.qty=qty;
        this.price=price;
    }
    display(){
        return this.qty*this.price;
    }
}
class PremiumDress extends Dress{
    display(){
        return super.display();
    }
}
class BillSystem{
    #grandTotal=0;
    getTotal(){
        return this.#grandTotal;
    }
    setTotal(value){
        this.#grandTotal=value;
    }
}
let billObj = new BillSystem();
let bills=[];
let editIndex=-1;
function addItem(){
    try{
        document.getElementById("date").innerText = new Date().toLocaleString();
        let customer = document.getElementById("customer").value;
        document.getElementById("customerDisplay").innerText = customer;
        let dress = document.getElementById("dress").value;
        let size=document.getElementById("size").value;
        let qty = parseInt(document.getElementById("quantity").value);
        let price = parseFloat(document.getElementById("price").value);
if(customer.trim()=="")
    throw "Enter customer name";
if(dress.trim()=="")
    throw "Enter dress name";
if(size=="") 
    throw "Select size";
if(isNaN(qty)||qty<=0)
    throw "Invalid quantity";
if(isNaN(price)||price<=0)
    throw "Invalid price";
let obj = new PremiumDress(customer,dress,size,qty,price);
if(editIndex==-1){
    bills.push(obj);
    document.getElementById("customer")
    .disabled = true;
}
else{
    bills[editIndex]=obj;
    editIndex=-1;
    document.getElementById("btn").innerText="Add";
}
displayData();
clearFields();
}
catch(error){
    showError(error);
}
finally{
    console.log("Order Process Completed");
}
}
function displayData(){
    let output="";
    let grand=0;
bills.forEach((item,index)=>{
    let total=
    item.display();
    grand+=total;
    output+=`
<tr>
<td>${index + 1}</td>

<td>${item.dress}</td>

<td>${item.size}</td>

<td>${item.qty}</td>

<td>₹${item.price}</td>

<td>₹${total}</td>
<td>
<button onclick="editItem(${index})">Edit</button>
<button onclick="deleteItem(${index})">Delete</button>
</td>
</tr>
`;
});

billObj.setTotal(grand);
document.getElementById("billData").innerHTML=output;
document.getElementById("grand").innerText=billObj.getTotal();
document.getElementById("finalTotal").innerText = grand.toFixed(2);
}
function editItem(index){
    let item = bills[index];
    document.getElementById("dress").value=item.dress;
    document.getElementById("size").value=item.size;
    document.getElementById("quantity").value=item.qty;
    document.getElementById("price").value=item.price;
    editIndex=index;
    document.getElementById("btn").innerText="Update";
}
function clearFields(){
    document.getElementById("dress").value="";
    document.getElementById("size").value="";
    document.getElementById("quantity").value="";
    document.getElementById("price").value="";
    document.getElementById("dress").focus();
}
function deleteItem(index){
    bills.splice(index,1);
    if(bills.length==0){
        document.getElementById("customer")
        .disabled = false;
        document.getElementById("customer")
        .value="";
        document.getElementById("customerDisplay")
        .innerText="";
    }
    displayData();
    showError("Item Deleted");
}
function printBill(){
    let content = document.getElementById("printArea").innerHTML;
    let original = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
    setTimeout(()=>{
        location.reload();
    },500);
}
function showError(message){
    let box = document.getElementById("errorBox");
    document.getElementById("errorMsg").innerText = message;
    box.style.display = "block";
    setTimeout(()=>{
        box.style.display = "none";
    },2000);
}
let fields = document.querySelectorAll("input,select");
fields.forEach((field,index)=>{
    field.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
            e.preventDefault();
            let next = fields[index+1];
            if(next){
                next.focus();
            }
            else{
                addItem();
            }
        }
    });
});
